const express = require('express');
const router = express.Router();
const Product = require('../models/Product')

const {
  isLoggedIn,
  isNotLoggedIn,
} = require("../helpers/middlewares");

router.get('/', isLoggedIn(), (req, res, next) => {
  Product.find().populate("owner")
    .then((product) => {
      res.json(product)
    })
    .catch(err =>
      next(err)
    )
});

router.get('/:id', isLoggedIn(), (req, res, next) => {
  const productId = req.params.id
  Product.findById(productId)
    .then((product) => {
      res.json(product)
    })
    .catch(err =>
      next(err)
    )
});

router.post('/', isLoggedIn(), (req, res, next) => {
  const { title, description, price, category, image } = req.body;
  const owner = req.session.currentUser._id;
  Product.create({ title, description, price, owner, category, image })
    .then((product) => {
      res.json(product)
      res.status(200)
    })
    .catch(err =>
      next(err)
    )
});

router.put('/:id', isLoggedIn(), (req, res, next) => {
  const { title, description, price, category, image } = req.body;
  const productId = req.params.id;
  const owner = req.session.currentUser._id;
  Product.findById(productId)
    .then((product) => {
      if (product.owner.equals(owner)) {
        Product.findByIdAndUpdate(productId, { title, description, price, owner, category, image }, { new: true })
          .then(editedProduct => {
            res.json(editedProduct)
            res.status(200)
          })
          .catch(err =>
            next(err))
      } else {
        next(createError(403))
      }
    })
    .catch(err => {
      next(err)
    })
})

router.delete('/:id', isLoggedIn(), (req, res, next) => {
  const productId = req.params.id;
  const owner = req.session.currentUser._id;
  Product.findById(productId)
    .then((product) => {
      if (product.owner.equals(owner)) {
        Product.findByIdAndDelete(productId)
          .then((removedProduct) => {
            res.json(removedProduct)
            res.status(200)
          })
          .catch(err =>
            next(err)
          )
      } else {
        next(createError(403))
      }
    })
    .catch(err => {
      next(err)
    })
})



module.exports = router;
