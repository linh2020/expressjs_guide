import jwt from "jsonwebtoken";

const register = (req, res, next) => {};

const login = (req, res, next) => {
  const data = req.body;
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "30s",
  });

  res.status(200).json({ status: "success", token });
};

// module.exports = { register, login };
export default { register, login };
