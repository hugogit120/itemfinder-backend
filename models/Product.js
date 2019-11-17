const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  image: { type: String, default: "https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?fit=scale" },
  category: {
    type: String,
    enum: [
      'electronic',
      'vehicle',
      'computer',
      'fashion',
      'miscellaneous']
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;