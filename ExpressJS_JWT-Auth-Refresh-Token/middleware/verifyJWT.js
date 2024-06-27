require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });

  console.log(authHeader); // Bearer token

  const foundAccessToken = authHeader.split(" ")[1];
  
  jwt.verify(
    foundAccessToken,
    process.env.AUTH_ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err)
        return res.status(403).json({
          message: "Access forbidden. Insufficient permissions.",
        });

      console.log("decoded: ", decoded);
      req.user = decoded.username;
      next();
    }
  );
};

module.exports = verifyJWT;
