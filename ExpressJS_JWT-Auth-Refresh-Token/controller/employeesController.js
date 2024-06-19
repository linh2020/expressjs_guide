const { v4: uuid } = require("uuid");
const fsPromises = require("fs").promises;
const path = require("path");

const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (newEmployee) {
    this.employees = newEmployee;
    // this.employees = [...this.employees, newEmployee];
  },
};
// console.log(data);

const getAllEmployees = (req, res) => {
  res.status(200).json(data.employees);
};

const createNewEmployee = async (req, res) => {
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

  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "employees.json"),
    JSON.stringify(data.employees)
  );

  res.status(201).json({ status: "Success", employees: data.employees });
};

const updateEmployee = (req, res) => {
  const employeeIndex = data.employees.findIndex(
    (emp) => emp.id == req.body.id
  );

  if (employeeIndex === -1)
    return res.status(400).json({
      status: "Failed",
      message: `Employee ID ${req.body.id} not found`,
    });

  const updateEmployee = { ...data.employees[employeeIndex] };
  console.log(updateEmployee);

  if (req.body.firstName) updateEmployee.firstName = req.body.firstName;
  if (req.body.lastName) updateEmployee.lastName = req.body.lastName;

  data.employees[employeeIndex] = updateEmployee;

  res.status(200).json({ status: "Success", employees: data.employees });
};

const deleteEmployee = (req, res) => {
  const foundEmployee = data.employees.find(
    (employee) => employee.id === req.body.id
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
  const foundEmployee = data.employees.find((emp) => emp.id === req.params.id);
  if (!foundEmployee)
    return res.status(400).json({
      message: `Employee ID ${req.body.id} not found.`,
    });

  res.status(200).json({ status: "Success", employees: foundEmployee });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
