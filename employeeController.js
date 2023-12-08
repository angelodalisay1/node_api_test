// employeeController.js
const express = require('express');
const bodyParser = require('body-parser');
const Employee = require('./employeeModel');

const app = express();
app.use(bodyParser.json());

const employees = [
  new Employee(1000001, 'George', 'Smith', 30000),
  new Employee(1000002, 'Samu', 'Doe', 38000),
  new Employee(1000003, 'Jane', 'Manager', 40000),
];

// Endpoint to retrieve all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Endpoint to retrieve details of a specific employee
app.get('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === employeeId);

  if (employee) {
    res.json(employee);
  } 
});

// Endpoint to add a new employee
app.post('/employees', (req, res) => {
  const { firstname, lastname, salary } = req.body;
  const newEmployee = new Employee(employees.length + 1, firstname, lastname);
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// Endpoint to update information of an existing employee
app.put('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === employeeId);

  if (employee) {
    const { firstname, lastname, salary } = req.body;
    employee.firstname = firstname || employee.firstname;
    employee.lastname = lastname || employee.lastname;
    employee.salary = salary || employee.salary;

    res.json(employee);
  } 
});

// Endpoint to remove specific information of an existing employee
app.patch('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === employeeId);

  if (employee) {
    const { firstname, lastname, salary } = req.body;
    if (firstname) employee.firstname = firstname;
    if (lastname) employee.lastname = lastname;
    if (salary) employee.salary = salary;

    res.json(employee);
  } 
});

// Endpoint to remove an existing employee
app.delete('/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const index = employees.findIndex(emp => emp.id === employeeId);

  if (index !== -1) {
    employees.splice(index, 1);
    res.json({ message: 'Employee removed successfully' });
  } 
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
