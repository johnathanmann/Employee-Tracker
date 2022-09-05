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

    const newDepartment = [
      {
        type:"input",
        message: "What is the department?",
        name: "department"
      }
    ]

  const addRole = [
    {
      type:"input",
      message: "What is the role?",
      name: "roleName"
    },
    {
      type:"input",
      message: "What is the roles salary?",
      name: "roleSalary"
    }
  ];

  const addEmployee = [
          {
            type:"input",
            message: "What is the employee's first name?",
            name: "firstName"
          },
          {
            type:"input",
            message: "What is the employee's last name?",
            name: "lastName"
          },
          {
            type:"input",
            message: "What is the employees role?",
            name: "employeeRole"
          },
          {
            type:"input",
            message: "Who is the employees manager?",
            name: "employeeManager"
          }
          ];
    
          const updateEmployee = [
            {
              type:"input",
              message: "What is the id of the employee you want to update?",
              name: "updateId"
            }];
    

function askQuestions() {
  db.query('SOURCE db/schema.sql', function (err, results) {
  });
return inquirer.prompt(mainMenu)
.then((response) =>{
  if (response.mainMenu === "View All Departments" ) {
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
      askQuestions()
    })
  } 
  if (response.mainMenu === "View All Roles" ) {
      db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
        askQuestions()
      })
  } 
  if (response.mainMenu === "View All Employees" ) {
    db.query('SOURCE db/employee_seeds.sql', function (err, results) {
    })
    db.query('SELECT * FROM employee', function (err, results) {
      console.table(results);
      askQuestions();
    })
  }
  if (response.mainMenu === "Add a Department" ) {
    return inquirer.prompt(newDepartment).then((response) =>{
      db.query("INSERT INTO department (department_name) VALUES ('"+response.department+"')", function(err, res) {
        if (err) throw err;
        askQuestions();
      });
    })
  }
  if (response.mainMenu === "Add a Role" ) {
    return inquirer.prompt(addRole).then((response) =>{
      db.query("INSERT INTO roles (title, salary) VALUES ('"+response.roleName+"', '"+response.roleSalary+"')", function(err, res) {
        if (err) throw err;
        askQuestions();
      });
    })
  }
  if (response.mainMenu === "Add an Employee" ) {
        return inquirer.prompt(addEmployee).then((response) =>{
          db.query("INSERT INTO employee (first_name, last_name, roles, manager) VALUES ('"+response.firstName+"', '"+response.lastName+"','"+response.employeeRole+"','"+response.employeeManager+"')", function(err, res) {
            if (err) throw err;
            askQuestions();
          });
        })
      }  

  if (response.mainMenu === "Update Employee Role" ) {
        // Show all employees so they can find the id of desired employee
        db.query('SELECT * FROM employee', function (err, results) {
          console.table(results);
          return inquirer.prompt(updateEmployee).then((response) =>{
            db.query("DELETE FROM employee WHERE id= "+response.updateId+" ", function(err, res) {
              if (err) throw err;
            });
            return inquirer.prompt(addEmployee).then((response) =>{
              db.query("INSERT INTO employee (first_name, last_name, roles, manager) VALUES ('"+response.firstName+"', '"+response.lastName+"','"+response.employeeRole+"','"+response.employeeManager+"')", function(err, res) {
                if (err) throw err;
                askQuestions();
              });
            })
          })
        })
    
      } 
});
};


askQuestions();

