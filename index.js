// Import and require mysql2
const mysql = require('mysql2');

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

// Query database
db.query('SELECT * FROM employee', function (err, results) {
  const transformed = results.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {})
  console.table(transformed)
});

