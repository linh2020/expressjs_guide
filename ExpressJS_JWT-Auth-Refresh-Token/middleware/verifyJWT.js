// require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });

  // console.log(authHeader); // Bearer token

  const foundAccessToken = authHeader.split(" ")[1];

  jwt.verify(
    foundAccessToken,
    process.env.AUTH_ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err)
        return res.status(403).json({
          message: "Access forbidden. Insufficient permissions.",
        });

      // console.log("decoded: ", decoded);
      // UserInfo: { username: 'master', roles: [ 2001, 1984, 5150 ] },
      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;
      
      next();
    }
  );
};

module.exports = verifyJWT;
