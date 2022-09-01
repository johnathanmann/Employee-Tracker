// Import and require necessary stuffs
const inquirer = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Berserk87!',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

const mainMenu = [
  {
      type: "list",
      message: "What would you like to do?",
      choices: [
      "View All Departments",
       "View All Roles",
        "View All Employees",
         "Add a Department",
          "Add a Role",
           "Add an Employee",
            "Update Employee Role"],
      name: "mainMenu",
    }
  ];

  const addDepartment = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: [
        "View All Departments",
         "View All Roles",
          "View All Employees",
           "Add a Department",
            "Add a Role",
             "Add an Employee",
              "Update Employee Role"],
        name: "mainMenu",
      }
    ];

function askQuestions() {
return inquirer.prompt(mainMenu)
.then((response) =>{
  if (response.mainMenu === "View All Departments" ) {
    db.query('SELECT * FROM department', function (err, results) {
      // const transformed = results.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
      // console.table(transformed)
      console.table(results);
      askQuestions()
    })
  } 
  if (response.mainMenu === "View All Roles" ) {
    db.query('SELECT * FROM roles', function (err, results) {
      // const transformed = results.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
      // console.table(transformed)
      console.table(results);
      askQuestions()
    })
  } 
  if (response.mainMenu === "View All Employees" ) {
    // Query database to find all employees
    db.query('SELECT * FROM employee', function (err, results) {
      // const transformed = results.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
      // console.table(transformed)
      console.table(results);
      askQuestions()
    })
  }
  if (response.mainMenu === "Add a Department" ) {

    fs.appendFile("./db/seeds/department_seeds_sql", '' , (err) => { 
      if (err) { 
        console.log(err); 
      } 
    });
  } 
  if (response.mainMenu === "Add a Role" ) {

  }
  if (response.mainMenu === "Add an Employee" ) {

  }  
  if (response.mainMenu === "Update Employee Role" ) {

  } 
});
};

askQuestions();