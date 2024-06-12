const { logger, logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}\t${err.message}`, "errorLog.txt");
  console.log(err.stack);
  res.status(500).json({ msg: err.message });
};

module.exports = errorHandler;
