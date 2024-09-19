require('dotenv').config();

const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET_KEY;

function generateToken(user) {

  return jwt.sign(user, jwtSecret, { expiresIn: '1h'});

}

function verifyToken(token) {

  try {
    let decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    return null;
  }

}

module.exports  = { generateToken, verifyToken}