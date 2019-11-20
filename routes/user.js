var express = require('express');
var router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");

const {
  isLoggedIn,
} = require("../helpers/middlewares");

router.get('/:id', isLoggedIn(), (req, res, next) => {
  const { id } = req.params;
  User.findById(id).populate("buys")
    .then(user => {
      res.json(user);
      res.status(200)
    })
    .catch(err =>
      next(err)
    )
});

router.put('/profile', isLoggedIn(), (req, res, next) => {
  const { fullName, avatar, phone, direction, accountNumber } = req.body;
  const id = req.session.currentUser._id;
  User.findByIdAndUpdate(id, { fullName, avatar, phone, direction, accountNumber }, { new: true })
    .then(user => {
      req.session.currentUser = user;
      res.json(user);
      res.status(200)
    })
    .catch(err =>
      next(err))
})

router.patch('/buys/:productId', isLoggedIn(), (req, res, next) => {
  const { productId } = req.params;
  const id = req.session.currentUser._id;
  User.findByIdAndUpdate(id, { $push: { buys: productId } }, { new: true })
    .then(user => {
      req.session.currentUser = user;
      Product.findByIdAndUpdate(productId, { buyed: true }, { new: true })
        .then(product => {
          res.json(user);
          res.status(200)
        })
        .catch(err => {
          next(err)
        })
    })
    .catch(err =>
      next(err))
})

router.get('/buys', isLoggedIn(), (req, res, next) => {
  const id = req.session.currentUser._id;
  User.findById(id).populate('buys')
    .then(user => {
      res.json(user);
      res.status(200)
    })
    .catch(err =>
      next(err))
})

router.get('/products', isLoggedIn(), (req, res, next) => {
  const id = req.session.currentUser._id;
  Product.find({ owmer: id })
    .then(products => {
      res.json(products);
      res.status(200)
    })
    .catch(err =>
      next(err))
})

module.exports = router;
