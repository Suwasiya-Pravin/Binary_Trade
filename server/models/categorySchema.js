const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

ProductCategorySchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Category', ProductCategorySchema);
