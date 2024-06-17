require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const app = express();

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const rootRouter = require("./routes/root");
const employeesRouter = require("./routes/api/employees");
const registerRouter = require("./routes/registerRouter");

const PORT = process.env.PORT || 5000;

// custom middleware
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// parsing
app.use(express.urlencoded({ extended: false })); // parse form data
app.use(express.json()); // parse json

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", rootRouter);
app.use("/employee", employeesRouter);
app.use("/register", registerRouter);

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Express server is listening on port ${PORT}`)
);
