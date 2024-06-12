const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../", "views", "index.html"));
  console.log(__dirname);
});

router.get("^/$|/new-page(.html)?", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "views", "new-page.html"));
});

router.get("^/$|/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

module.exports = router;
