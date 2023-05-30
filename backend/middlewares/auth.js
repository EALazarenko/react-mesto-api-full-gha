// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
/* const { JWT_SECRET } = require('../utils/constants'); */
/* const { JWT_SECRET } = require('../config'); */
const { NODE_ENV, JWT_SECRET } = process.env;
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Требуется авторизация1!');
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new AuthError('Требуется авторизация2!');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

/* module.exports = (req, res, next) => {
  const token = req.cookies.jwt || req.headers.authorization.split(' ')[1]; // COMMENT
  const token = req.cookies.jwt || req.headers.authorization.replace('Bearer ', '');

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
 */
