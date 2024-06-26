const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (newUser) {
    this.users = newUser;
  },
};

const handleNewUser = async (req, res) => {
  const { username, pwd } = req.body;
  if (!username || !pwd)
    return res.status(400).json({
      message: "Username and password are required.",
    });

  const duplicate = usersDB.users.find(
    (account) => account.username === username
  );

  if (duplicate)
    return res.status(409).json({
      message: `The username ${username} is already taken.`,
    });

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = { username: username, pwd: hashedPwd };

    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    console.log(usersDB.users);
    res.status(201).json({
      success: `New user ${username} created!`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { handleNewUser };
