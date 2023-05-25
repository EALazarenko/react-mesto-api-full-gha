// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
/* const { JWT_SECRET } = require('../utils/constants'); */
const { JWT_SECRET } = require('../config');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError('Требуется авторизация1!'));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthError('Требуется авторизация2!'));
  }

  req.user = payload;
  return next();
};
