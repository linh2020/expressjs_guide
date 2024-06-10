require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

// parsing
app.use(express.json());



app.get("/", (req, res) => {
  res.status(200).json({ msg: "JWT Authentication With Refresh Tokens" });
});

app.listen(PORT, () =>
  console.log(`Express server is listening on port ${PORT}`)
);
