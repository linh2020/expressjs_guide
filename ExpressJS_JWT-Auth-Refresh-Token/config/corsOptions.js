// Cross Origin Resource Sharing
// assuming front-end application is running on localhost port 3000
const whitelist = ["http://localhost:5000", "http://localhost:3000"];

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

module.exports = corsOptions;
