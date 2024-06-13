const data = {};
data.employees = require("../data/employees.json");
// console.log(data);

const getAllEmployees = (req, res) => {
  res.status(200).json(data);
};

const createNewEmployee = (req, res) => {
  // console.log(req.body);
  res.status(200).json({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
};

const updateEmployee = (req, res) => {
  res.status(200).json({
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
};

const deleteEmployee = (req, res) => {
  res.status(200).json({
    id: req.body.id,
  });
};

const getEmployee = (req, res) => {
  res.status(200).json({
    id: req.params.id,
  });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
