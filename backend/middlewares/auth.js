const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-duper-very-secret-key');
  } catch (error) {
    throw new Unauthorized('Необходима авторизация');
  }
  req.user = payload;
  next();
};
