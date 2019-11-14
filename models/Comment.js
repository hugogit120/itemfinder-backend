const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  body: String,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  answer: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;