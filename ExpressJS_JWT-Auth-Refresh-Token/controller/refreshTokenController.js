require("dotenv").config();
const jwt = require("jsonwebtoken");

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (newUser) {
    this.users = newUser;
  },
};

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  // console.log("refreshToken: ", cookies.refreshToken);
  // console.log("cookies: ", cookies);

  if (!cookies?.refreshToken)
    return res.status(401).json({
      message: "Access denied. Authentication cookie has expired.",
    });

  console.log("refreshToken: ", cookies.refreshToken);
  const refreshToken = cookies.refreshToken;

  const foundUser = usersDB.users.find(
    (account) => account.refreshToken === refreshToken
  );

  if (!foundUser)
    return res.status(403).json({
      message: "Access forbidden. Invalid refresh token. 1",
    });

  jwt.verify(
    refreshToken,
    process.env.AUTH_REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.username !== decoded.username)
        return res.status(403).json({
          message: "Access forbidden. Invalid refresh token. 2",
        });

      const accessToken = jwt.sign(
        { username: decoded.username },
        process.env.AUTH_ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRY }
      );
      res.status(200).json({
        accessToken: accessToken,
      });
    }
  );
};

module.exports = { handleRefreshToken };
