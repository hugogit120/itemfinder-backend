const express = require('express');
const router = express.Router();
const Product = require('../models/Product')

const {
  isLoggedIn,
  isNotLoggedIn,
} = require("../helpers/middlewares");

router.get('/', isLoggedIn(), (req, res, next) => {
  Product.find()
    .then((product) => {
      res.json(product)
    })
    .catch(err => console.log(err)
    )
});

router.post('/', isLoggedIn(), (req, res, next) => {
  const { title, description, price, category, image } = req.body;
  const owner = req.session.currentUser._id;
  Product.create({ title, description, price, owner, category, image })
    .then((product) => {
      res.json(product)
    })
    .catch(err => console.log(err)
    )
});

module.exports = router;
