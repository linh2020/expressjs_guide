const { v4: uuid } = require("uuid");

const data = {
  employees: [],
  setEmployees: function (newEmployee) {
    this.employees = newEmployee;
    // this.employees = [...this.employees, newEmployee];
  },
};
// console.log(data);

const getAllEmployees = (req, res) => {
  res.status(200).json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: uuid(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  if (!newEmployee.firstName || !newEmployee.lastName)
    return res.status(400).json({
      status: "Failed",
      message: "First and last names are required.",
    });

  data.setEmployees([...data.employees, newEmployee]);
  // data.setEmployees(newEmployee);
  res.status(201).json({ status: "success", employees: data.employees });
};

const updateEmployee = (req, res) => {
  res.status(200).json({
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
};

const deleteEmployee = (req, res) => {
  const foundEmployee = data.employees.find(
    (employee) => employee.id === req.p
  );

  if (!foundEmployee)
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found.` });

  const filteredEmployees = data.employees.filter(
    (employee) => employee.id !== req.body.id
  );

  data.setEmployees(filteredEmployees);
  res.status(200).json({ data });
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
