var express = require('express');
var router = express.Router();
const User = require("../models/User");

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require("../helpers/middlewares");

router.get('/:id', isLoggedIn(), (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.json(user);
      res.status(200)
    })
    .catch(err =>
      next(err)
    )
});

router.put('/profile', isLoggedIn(), (req, res, next) => {
  const { fullname, avatar, phone, direction, accountNumber } = req.body;
  const id = req.session.currentUser._id;
  User.findByIdAndUpdate(id, { fullname, avatar, phone, direction, accountNumber }, { new: true })
    .then(user => {
      req.session.currentUser = user;
      res.json(user);
      res.status(200)
    })
    .catch(err =>
      next(err))
})

module.exports = router;
