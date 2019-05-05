const jwt = require('jsonwebtoken');
const config = require('./../config/config');
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    token = authHeader.split(" ")[1];
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if (err) {
            res.status(401).json({
              success: false,
              message: 'Token is not valid'
            });
          } else {
            req.user = decoded;
            next();
          }
    })
   
  }