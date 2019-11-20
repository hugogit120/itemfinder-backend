const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User");


const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
  validationSignUp
} = require("../helpers/middlewares");

router.get('/me', isLoggedIn(), (req, res, next) => {
  req.session.currentUser.password = '*';
  res.json(req.session.currentUser);
});

router.post('/login', isNotLoggedIn(), validationLoggin(), async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;
  try {

    let user = await User.findOne({ username: usernameOrEmail });
    if (!user) {
      user = await User.findOne({ email: usernameOrEmail });
    }
    else if (!user) {
      next(createError(404));
    }
    else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res
        .status(200)
        .json(user);
      return
    }
    else {
      next(createError(401));
    }
  }
  catch (error) {
    next(error);
  }
},
);


router.post(
  "/signup",
  isNotLoggedIn(), validationSignUp(),
  async (req, res, next) => {
    const { username, password, email } = req.body;

    try {

      const usernameExists = await User.findOne({ username }, "username");
      const emailExists = await User.findOne({ email }, "email")
      if (usernameExists || emailExists) return next(createError(400));
      else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = await User.create({ username, password: hashPass, email });
        req.session.currentUser = newUser;
        res
          .status(200) //  OK
          .json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  res
    .status(204)
    .json({ "message": "User logged out!" });
});

router.get('/private', isLoggedIn(), (req, res, next) => {
  res
    .status(200)
    .json({ message: 'Test - User is logged in' });
});


module.exports = router;
