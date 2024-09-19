const jwtUtils = require('../utils/jwt-util');

function protectRoute(req, res, next) {

  const token = req.headers.authorization;

  if(!token) {
    return res.status(401).json({ message: 'Authentication token not provided'})
  }

  const user = jwtUtils.verifyToken(token);

  if(!user) {
    return res.status(401).json({ message: 'Authentication token not valid'})
  }

  next();

}

module.exports = {protectRoute};