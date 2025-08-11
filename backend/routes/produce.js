import express from 'express';
import { body, validationResult, query } from 'express-validator';
import Produce from '../models/Produce.js';
import User from '../models/User.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const produceValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('category').isIn(['Vegetables', 'Fruits', 'Grains', 'Herbs', 'Dairy', 'Meat', 'Other']).withMessage('Invalid category'),
  body('quantity').isFloat({ min: 0 }).withMessage('Quantity must be a positive number'),
  body('unit').isIn(['kg', 'lb', 'pieces', 'bunches', 'bags', 'boxes', 'liters', 'gallons']).withMessage('Invalid unit'),
  body('pricePerUnit').isFloat({ min: 0.01 }).withMessage('Price must be greater than 0'),
  body('availableDate').isISO8601().toDate().withMessage('Invalid available date')
];

// @route   POST /api/produce
// @desc    Add new produce
// @access  Private (Farmers only)
router.post('/', authenticateToken, authorizeRoles('farmer'), produceValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { name, category, quantity, unit, pricePerUnit, description, availableDate, isOrganic, harvestDate } = req.body;

    // Check if available date is not in the past
    if (new Date(availableDate) < new Date().setHours(0, 0, 0, 0)) {
      return res.status(400).json({ message: 'Available date cannot be in the past' });
    }

    const produce = new Produce({
      name,
      category,
      quantity,
      unit,
      pricePerUnit,
      description,
      availableDate,
      farmer: req.user._id,
      isOrganic: isOrganic || false,
      harvestDate
    });

    await produce.save();
    await produce.populate('farmer', 'name email phone address');

    // Emit to all connected buyers
    const io = req.app.get('io');
    io.to('buyer').emit('newProduce', produce);

    res.status(201).json({
      message: 'Produce added successfully',
      produce
    });
  } catch (error) {
    console.error('Add produce error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/produce
// @desc    Get all active produce (for buyers)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, sortBy = 'createdAt', order = 'desc', page = 1, limit = 20 } = req.query;

    // Build query
    const query = { status: 'active' };
    
    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sortOrder = order === 'desc' ? -1 : 1;
    const sort = { [sortBy]: sortOrder };

    const produces = await Produce.find(query)
      .populate('farmer', 'name email phone address')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Produce.countDocuments(query);

    res.json({
      produces,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get produces error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/produce/farmer
// @desc    Get farmer's own produce
// @access  Private (Farmers only)
router.get('/farmer', authenticateToken, authorizeRoles('farmer'), async (req, res) => {
  try {
    const produces = await Produce.find({ farmer: req.user._id })
      .populate('farmer', 'name email phone address')
      .sort({ createdAt: -1 });

    res.json(produces);
  } catch (error) {
    console.error('Get farmer produces error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/produce/:id
// @desc    Get single produce
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id)
      .populate('farmer', 'name email phone address');

    if (!produce) {
      return res.status(404).json({ message: 'Produce not found' });
    }

    res.json(produce);
  } catch (error) {
    console.error('Get produce error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Produce not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/produce/:id
// @desc    Update produce
// @access  Private (Owner farmer only)
router.put('/:id', authenticateToken, authorizeRoles('farmer'), async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id);

    if (!produce) {
      return res.status(404).json({ message: 'Produce not found' });
    }

    // Check if the farmer owns this produce
    if (produce.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { name, category, quantity, unit, pricePerUnit, description, availableDate, isOrganic } = req.body;

    // Update fields
    if (name) produce.name = name;
    if (category) produce.category = category;
    if (quantity !== undefined) produce.quantity = quantity;
    if (unit) produce.unit = unit;
    if (pricePerUnit) produce.pricePerUnit = pricePerUnit;
    if (description) produce.description = description;
    if (availableDate) produce.availableDate = availableDate;
    if (isOrganic !== undefined) produce.isOrganic = isOrganic;

    await produce.save();
    await produce.populate('farmer', 'name email phone address');

    // Emit update to all buyers
    const io = req.app.get('io');
    io.to('buyer').emit('produceUpdated', produce);

    res.json({
      message: 'Produce updated successfully',
      produce
    });
  } catch (error) {
    console.error('Update produce error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/produce/:id
// @desc    Delete produce
// @access  Private (Owner farmer only)
router.delete('/:id', authenticateToken, authorizeRoles('farmer'), async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id);

    if (!produce) {
      return res.status(404).json({ message: 'Produce not found' });
    }

    // Check if the farmer owns this produce
    if (produce.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Produce.findByIdAndDelete(req.params.id);

    // Emit removal to all buyers
    const io = req.app.get('io');
    io.to('buyer').emit('produceRemoved', { id: req.params.id });

    res.json({ message: 'Produce deleted successfully' });
  } catch (error) {
    console.error('Delete produce error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/produce/search
// @desc    Search produce
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q, category } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const query = {
      status: 'active',
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    };

    if (category && category !== 'All') {
      query.category = category;
    }

    const produces = await Produce.find(query)
      .populate('farmer', 'name email phone address')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(produces);
  } catch (error) {
    console.error('Search produce error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;