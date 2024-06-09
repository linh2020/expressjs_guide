import express from "express";
import jwt from "jsonwebtoken";

let refreshTokens = [];

const register = (req, res, next) => {};

const login = (req, res, next) => {
  const data = req.body;
  console.log({ data });

  const accessToken = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "30s",
  });

  const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET_KEY);
  refreshTokens.push(refreshToken);
  console.log(refreshTokens);

  res.status(200).json({
    status: "success",
    accessToken,
    refreshToken,
  });
};

const refreshToken = (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).json({ status: "Unauthorized" }); // 401 - Unauthorized
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json({ err }); // 403 - Forbidden

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (err, data) => {
    console.log(err, data);
    if (err) return res.status(403).json({ err }); // 403 - Forbidden
    const accessToken = jwt.sign(
      { username: data.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30s" }
    );
    res.status(200).json({ accessToken });
  });
};

const deleteToken = (req, res) => {
  const refreshToken = req.body;
  refreshTokens = refreshTokens.filter((e) => e !== refreshToken);
  res.status(200).json({ status: "Success", refreshTokens });
};

// module.exports = { register, login };
export default { register, login, refreshToken, deleteToken };
