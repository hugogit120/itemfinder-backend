const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar: String,
  fullName: String,
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: String,
  accountNumber: String,
  direction: String,
  rating: { type: Number, min: 1, max: 5 },
  buys: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;