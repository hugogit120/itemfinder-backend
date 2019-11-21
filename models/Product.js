const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  buyed: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  image: { type: String, default: "http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png" },
  category: {
    type: String,
    default: 'electronic'
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;