require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fsPromises = require("fs").promises;
const path = require("path");

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (newUser) {
    this.users = newUser;
  },
};

const handleLogin = async (req, res) => {
  const { username, pwd } = req.body;
  if (!username || !pwd)
    return res.status(400).json({
      message: "Username and password are required.",
    });

  const foundUser = usersDB.users.find(
    (account) => account.username === username
  );

  if (!foundUser)
    return res.status(401).json({
      Message: "Unauthorized access. Please log in with valid credentials.",
    });

  const matchUser = await bcrypt.compare(pwd, foundUser.pwd);
  if (matchUser) {
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.AUTH_ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.AUTH_REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRY }
    );

    const currentUser = { ...foundUser, refreshToken };

    const otherUsers = usersDB.users.filter(
      (account) => account.username !== foundUser.username
    );

    usersDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({
      Message: "Login successful.",
      User: `User '${username}' is logged in!`,
      accessToken: accessToken,
    });
    //
  } else {
    res.status(401).json({
      message: "Invalid username or password.",
    });
  }
};

module.exports = { handleLogin };
