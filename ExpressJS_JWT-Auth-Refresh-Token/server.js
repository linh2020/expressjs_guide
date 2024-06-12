require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 5000;

// custom middleware
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = ["http://localhost:5000", "http://localhost:3000"]; // assuming front-end application is running on localhost port 3000
const corsOptions = {
  origin: (origin, callback) => {
    // if (!origin || origin === "http://localhost:5000") {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // [not]origin must be removed on production mode
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// parsing
app.use(express.urlencoded({ extended: false })); // parse form data
app.use(express.json()); // parse json
app.use(express.static(path.join(__dirname, "/public"))); // serve static files

app.get("^/$|/index(.html)?", (req, res) => {
  //   res.status(200).json({ msg: "JWT Authentication With Refresh Tokens" });
  //   res.status(200).sendFile("./views/index.html", { root: __dirname });
  res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("^/$|/new-page(.html)?", (req, res) => {
  //   res.status(200).json({ msg: "JWT Authentication With Refresh Tokens" });
  //   res.status(200).sendFile("./views/index.html", { root: __dirname });
  res.status(200).sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("^/$|/old-page(.html)?", (req, res) => {
  //   res.status(200).json({ msg: "JWT Authentication With Refresh Tokens" });
  //   res.status(200).sendFile("./views/index.html", { root: __dirname });
  res.redirect(301, "/new-page.html");
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Express server is listening on port ${PORT}`)
);
