require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const subRouter = require("./routes/subdir");
const rootRouter = require("./routes/root");

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

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", rootRouter);
app.use("/subdir", subRouter);

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Express server is listening on port ${PORT}`)
);
