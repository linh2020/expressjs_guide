import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const accessToken = req.headers["authorization"];
    if (!accessToken) return res.status(401).json({ status: "Unauthorized" }); // 401 - Unauthorized

    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
