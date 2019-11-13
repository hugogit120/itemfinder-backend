const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) next();
  else next(createError(401));
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403));
};

exports.validationSignUp = () => (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) next(createError(400));
  else next();
}

exports.validationLoggin = () => (req, res, next) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) next(createError(400));
  else next();
}
