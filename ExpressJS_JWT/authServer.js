import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";

dotenv.config();
const app = express();
const PORT = 5555;

// parsing
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () =>
  console.log(`Express server is listening on port ${PORT}`)
);
