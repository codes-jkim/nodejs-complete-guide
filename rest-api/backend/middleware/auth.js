const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false
    const error = new Error('Not authenticated.');
    error.code = 401; // unauthorized 
    throw error;
  }
  const token = req.get('Authorization').split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    req.isAuth = false;
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    req.isAuth = false
    const error = new Error('Not authenticated.');
    error.code = 401; // unauthorized 
    throw error;
  }

  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
}