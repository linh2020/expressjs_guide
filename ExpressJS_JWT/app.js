import express from "express";
import dotenv from "dotenv";
import booksRouter from "./routes/booksRoute.js";
import authRouter from "./routes/authRoute.js";
import authenticateUserMiddleware from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// parsing
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", authenticateUserMiddleware, booksRouter);

app.listen(PORT, () =>
  console.log(`Express server is listening on port ${PORT}`)
);
