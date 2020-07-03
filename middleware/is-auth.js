const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
    // looks like : Authorization = Bearer ecvdcbiwucbiewu
  // we get token by getting 2nd index
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  // now check token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecretkey');
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  //   check decoded token
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  //   now we are loggedin
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
