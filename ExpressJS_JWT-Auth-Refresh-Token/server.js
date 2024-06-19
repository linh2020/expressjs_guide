require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const app = express();

// Middleware
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials");

// Router
const rootRouter = require("./routes/root");
const employeesRouter = require("./routes/api/employeesRoutes");
const registerRouter = require("./routes/registerRoutes");
const authRouter = require("./routes/authRoutes");
const refreshRouter = require("./routes/refreshRoutes");
const logoutRouter = require("./routes/logoutRoutes");

const PORT = process.env.PORT || 5000;

// custom middleware
app.use(logger);

// check credentials before CORS, for fetching cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// parsing
app.use(express.urlencoded({ extended: false })); // parse form data
app.use(express.json()); // parse json
app.use(cookieParser()); // middleware for cookies

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", rootRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshRouter);
app.use("/logout", logoutRouter);

app.use(verifyJWT);
app.use("/employees", employeesRouter);

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Express server is listening on port ${PORT}`)
);
