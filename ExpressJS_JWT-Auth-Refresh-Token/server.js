require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();

const PATH = require("path");
const PORT = process.env.PORT || 5000;

// parsing
app.use(express.json());

app.get("^/$|/index(.html)?", (req, res) => {
  //   res.status(200).json({ msg: "JWT Authentication With Refresh Tokens" });
  //   res.status(200).sendFile("./views/index.html", { root: __dirname });
  res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("^/$|/404(.html)?", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () =>
  console.log(`Express server is listening on port ${PORT}`)
);
