import express from 'express';
import { body, validationResult } from 'express-validator';
import Order from '../models/Order.js';
import Produce from '../models/Produce.js';
import User from '../models/User.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { sendOrderConfirmationEmail, sendOrderStatusUpdateEmail } from '../utils/emailService.js';

const router = express.Router();

// Validation rules
const orderValidation = [
  body('produceId').isMongoId().withMessage('Invalid produce ID'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('pickupDate').isISO8601().toDate().withMessage('Invalid pickup date')
];

// @route   POST /api/orders
// @desc    Place a new order
// @access  Private (Buyers only)
router.post('/', authenticateToken, authorizeRoles('buyer'), orderValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { produceId, quantity, pickupDate, notes } = req.body;

    // Find the produce
    const produce = await Produce.findById(produceId).populate('farmer', 'name email phone address');
    if (!produce) {
      return res.status(404).json({ message: 'Produce not found' });
    }

    // Check if produce is active
    if (produce.status !== 'active') {
      return res.status(400).json({ message: 'Produce is not available' });
    }

    // Check if enough quantity is available
    if (quantity > produce.quantity) {
      return res.status(400).json({ 
        message: `Only ${produce.quantity} ${produce.unit} available` 
      });
    }

    // Check if buyer is not the same as farmer
    if (produce.farmer._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot order from yourself' });
    }

    // Create the order
    const order = new Order({
      buyer: req.user._id,
      farmer: produce.farmer._id,
      produce: produce._id,
      quantity,
      unitPrice: produce.pricePerUnit,
      pickupDate,
      notes
    });

    await order.save();

    // Update produce quantity
    produce.quantity -= quantity;
    await produce.save();

    // Populate order details
    await order.populate([
      { path: 'buyer', select: 'name email phone address' },
      { path: 'farmer', select: 'name email phone address' },
      { path: 'produce', select: 'name category unit' }
    ]);

    // Send email notifications
    try {
      // Email to buyer
      await sendOrderConfirmationEmail(order.buyer.email, order, 'buyer');
      // Email to farmer
      await sendOrderConfirmationEmail(order.farmer.email, order, 'farmer');
    } catch (emailError) {
      console.error('Failed to send order confirmation emails:', emailError);
    }

    // Emit real-time notifications
    const io = req.app.get('io');
    
    // Notify farmer of new order
    io.to(`user_${produce.farmer._id}`).emit('newOrder', order);
    
    // Notify all buyers about updated produce
    io.to('buyer').emit('produceUpdated', produce);

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/buyer
// @desc    Get buyer's orders
// @access  Private (Buyers only)
router.get('/buyer', authenticateToken, authorizeRoles('buyer'), async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate('farmer', 'name email phone address')
      .populate('produce', 'name category unit')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get buyer orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/farmer
// @desc    Get farmer's orders
// @access  Private (Farmers only)
router.get('/farmer', authenticateToken, authorizeRoles('farmer'), async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.user._id })
      .populate('buyer', 'name email phone address')
      .populate('produce', 'name category unit')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Get farmer orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/admin
// @desc    Get all orders (for admin)
// @access  Private (Admin only)
router.get('/admin', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(query)
      .populate('buyer', 'name email phone address')
      .populate('farmer', 'name email phone address')
      .populate('produce', 'name category unit')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get admin orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private (Farmer or Admin only)
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'ready', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(req.params.id)
      .populate('buyer', 'name email phone address')
      .populate('farmer', 'name email phone address')
      .populate('produce', 'name category unit');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check permissions
    const isOwner = order.farmer._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Status transition validation
    if (order.status === 'completed' || order.status === 'cancelled') {
      return res.status(400).json({ message: 'Cannot modify completed or cancelled orders' });
    }

    // If cancelling, restore produce quantity
    if (status === 'cancelled' && order.status !== 'cancelled') {
      const produce = await Produce.findById(order.produce._id);
      if (produce) {
        produce.quantity += order.quantity;
        await produce.save();
        
        // Notify buyers about updated quantity
        const io = req.app.get('io');
        io.to('buyer').emit('produceUpdated', produce);
      }
    }

    order.status = status;
    await order.save();

    // Send email notification
    try {
      await sendOrderStatusUpdateEmail(order.buyer.email, order, status);
    } catch (emailError) {
      console.error('Failed to send status update email:', emailError);
    }

    // Emit real-time update
    const io = req.app.get('io');
    io.to(`user_${order.buyer._id}`).emit('orderUpdated', order);

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/orders/:id
// @desc    Cancel order (by buyer)
// @access  Private (Order owner only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('produce', 'name category unit');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is the buyer of this order
    if (order.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Only allow cancellation if order is pending
    if (order.status !== 'pending') {
      return res.status(400).json({ 
        message: 'Can only cancel pending orders' 
      });
    }

    // Restore produce quantity
    const produce = await Produce.findById(order.produce._id);
    if (produce) {
      produce.quantity += order.quantity;
      await produce.save();
      
      // Notify buyers about updated quantity
      const io = req.app.get('io');
      io.to('buyer').emit('produceUpdated', produce);
    }

    // Delete the order
    await Order.findByIdAndDelete(req.params.id);

    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private (Order participants or admin only)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer', 'name email phone address')
      .populate('farmer', 'name email phone address')
      .populate('produce', 'name category unit pricePerUnit');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check permissions
    const isBuyer = order.buyer._id.toString() === req.user._id.toString();
    const isFarmer = order.farmer._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isBuyer && !isFarmer && !isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;