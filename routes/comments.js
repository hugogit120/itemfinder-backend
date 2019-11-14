var express = require('express');
var router = express.Router();
const Comment = require("../models/Comment");
const Product = require("../models/Product");

const {
    isLoggedIn,
    isNotLoggedIn,
} = require("../helpers/middlewares");

router.get('/', isLoggedIn(), (req, res, next) => {
    Comment.find().populate("product").populate("owner")
        .then((comment) => {
            res.json(comment)
        })
        .catch(err =>
            next(err)
        )
});

router.get('/:productId', isLoggedIn(), async (req, res, next) => {
    try {
        const { productId } = req.params;
        const comments = await Comment.find({ product: productId })
        res.json(comments)
    } catch (err) { console.error(err) }

});

router.post('/add/:productId', isLoggedIn(), async (req, res, next) => {
    try {
        const { body } = req.body;
        const { productId } = req.params;
        const userId = req.session.currentUser._id;
        const newComment = await Comment.create({ owner: userId, body: body, product: productId })
        res.json(newComment)
    } catch (err) { console.error(err) }
});

router.patch('/:commentId', isLoggedIn(), async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { answer } = req.body;
        const userId = req.session.currentUser._id;
        const answerComment = await Comment.findOne({ _id: commentId }).populate("product")
        if (answerComment.product.owner.equals(userId)) {
            const answeredCommnet = await Comment.findByIdAndUpdate(commentId, { answer: answer }, { new: true })
            res.json(answeredCommnet)
        } else {
            return res.json({ "message": "Error: Only owner of Product can answer the comment" })
        }
    } catch (err) { console.error(err) }
});

router.delete('/:commentId', isLoggedIn(), async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const userId = req.session.currentUser._id;
        const deleteComment = await Comment.findOne({ _id: commentId }).populate("product")
        if (deleteComment.product.owner.equals(userId)) {
            deleteComment.remove()
            res.json(deleteComment)
        } else {
            return res.json({ "message": "Error: Only owner of Product can delete comment" })
        }
    } catch (err) { console.error(err) }
});

module.exports = router