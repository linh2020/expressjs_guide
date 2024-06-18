const bcrypt = require("bcrypt");

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
  if (matchUser)
    res.status(200).json({
      Message: "Login successful.",
      User: `User '${username}' is logged in!`,
    });
  else
    res.status(401).json({
      message: "Invalid username or password.",
    });
};

module.exports = { handleLogin };
