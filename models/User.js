const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar: String,
  fullname: String,
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: String,
  accountNumber: String,
  direction: String,
  rating: { type: Number, min: 1, max: 5 }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;