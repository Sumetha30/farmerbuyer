import mongoose from 'mongoose';

const produceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Produce name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Vegetables', 'Fruits', 'Grains', 'Herbs', 'Dairy', 'Meat', 'Other']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  originalQuantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    enum: ['kg', 'lb', 'pieces', 'bunches', 'bags', 'boxes', 'liters', 'gallons']
  },
  pricePerUnit: {
    type: Number,
    required: [true, 'Price per unit is required'],
    min: [0.01, 'Price must be greater than 0']
  },
  description: {
    type: String,
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  availableDate: {
    type: Date,
    required: [true, 'Available date is required']
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'sold_out', 'expired'],
    default: 'active'
  },
  images: [{
    type: String // URLs to images
  }],
  isOrganic: {
    type: Boolean,
    default: false
  },
  harvestDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
produceSchema.index({ farmer: 1, status: 1 });
produceSchema.index({ category: 1, status: 1 });
produceSchema.index({ availableDate: 1 });

// Middleware to update status based on quantity
produceSchema.pre('save', function(next) {
  if (this.quantity <= 0 && this.status === 'active') {
    this.status = 'sold_out';
  } else if (this.quantity > 0 && this.status === 'sold_out') {
    this.status = 'active';
  }
  
  // Set original quantity if not already set
  if (this.isNew && !this.originalQuantity) {
    this.originalQuantity = this.quantity;
  }
  
  next();
});

// Check if produce has expired
produceSchema.methods.isExpired = function() {
  return new Date() > this.availableDate;
};

export default mongoose.model('Produce', produceSchema);