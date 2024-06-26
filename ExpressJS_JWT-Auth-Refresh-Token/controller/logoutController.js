// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (newUser) {
//     this.users = newUser;
//   },
// };

// const fsPromises = require("fs").promises;
// const path = require("path");

// const handleLogout = async (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.refreshToken)
//     return res.status(204).json({
//       // 204 - No Content
//       message: "204 - No Content.",
//     });

//   console.log("refreshToken: ", cookies.refreshToken);
//   const refreshToken = cookies.refreshToken;

//   const foundUser = usersDB.users.find(
//     (account) => account.refreshToken === refreshToken
//   );

//   if (!foundUser) {
//     res.clearCookie("refreshToken", {
//       httpOnly: true,
//       sameSite: "None",
//       secure: true,
//       maxAge: 1000 * 60 * 60 * 24,
//     });

//     return res.status(204).json({
//       message: "Cookies cleared. You have been logged out successfully.",
//     });
//   }

//   const currentUser = { ...foundUser, refreshToken: "" };

//   const otherUsers = usersDB.users.filter(
//     (account) => account.refreshToken !== foundUser.refreshToken
//   );

//   usersDB.setUsers([...otherUsers, currentUser]);

//   await fsPromises.writeFile(
//     path.join(__dirname, "..", "model", "users.json"),
//     JSON.stringify(usersDB.users)
//   );

//   // secure:true - only serves on https in production
//   res.clearCookie("refreshToken", {
//     httpOnly: true,
//     sameSite: "None",
//     secure: true,
//     maxAge: 1000 * 60 * 60 * 24,
//   });

//   res.status(204).json({
//     message: "Cookies cleared. You have been logged out successfully.",
//   });

//   //
// };

// module.exports = { handleLogout };

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (newUsers) {
    this.users = newUsers;
  },
};

const fsPromise = require("fs").promises;
const path = require("path");

const clearRefreshTokenCookie = (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.status(204).json({
    message: "Cookies cleared. You have been logged out successfully.",
  });
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    return clearRefreshTokenCookie(res);
  }

  const refreshToken = cookies.refreshToken;
  const foundUser = usersDB.find(
    (account) => account.refreshToken === refreshToken
  );

  if (!foundUser) {
    clearRefreshTokenCookie(res);
  }

  const updatedUser = { ...foundUser, refreshToken: "" };
  const otherUsers = usersDB.filter(
    (account) => account.refreshToken !== refreshToken
  );

  usersDB.setUsers([...otherUsers, updatedUser]);

  await fsPromise.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );

  clearRefreshTokenCookie(res);
};

module.exports = handleLogout;
