const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Atharva';  // use env var in production

const AuthToken = (req, res, next) => {
  const token = req.cookies.Tokan;  // get token from cookie named 'Token'

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;  // attach user info to request object
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token is invalid or expired' });
  }
};

module.exports = AuthToken;

