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
  ]

function populateTables(){
  db.query('SOURCE db/employee_seeds.sql', function (err, results) {
  });
}

function askQuestions() {
  db.query('SOURCE db/schema.sql', function (err, results) {
  });
return inquirer.prompt(mainMenu)
.then((response) =>{
  if (response.mainMenu === "View All Departments" ) {
    db.query('UPDATE db/department_seeds.sql', function (err,results){
      db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        askQuestions()
      })
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
      console.table(results)
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
    return inquirer.prompt(addRole).then((response) =>{
      db.query("INSERT INTO roles (title, salary) VALUES ('"+response.roleName+"', '"+response.roleSalary+"')", function(err, res) {
        if (err) throw err;
        askQuestions();
      });
    })
  }
  if (response.mainMenu === "Add an Employee" ) {
    
  }  
  if (response.mainMenu === "Update Employee Role" ) {

  } 
});
};
db.query('SOURCE db/schema.sql', function (err, results) {
});
askQuestions();