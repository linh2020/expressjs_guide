const express = require("express");
const router = express.Router();
const path = require("path");
const data = {};
data.employees = require("../../data/employees.json");
// console.log(data);
router
  .route("/")
  .get((req, res) => {
    res.status(200).json(data);
  })
  .post((req, res) => {
    // console.log(req.body);
    res.status(200).json({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
  })
  .put((req, res) => {
    res.status(200).json({
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
  })
  .delete((req, res) => {
    console.log(req.body);
    res.status(200).json({
      id: req.body.id,
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    res.status(200).json({
      id: req.params.id,
    });
  })
  .put((req, res) => {})
  .delete((req, res) => {});

module.exports = router;
