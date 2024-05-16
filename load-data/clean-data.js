const mysql = require("mysql2");
require('dotenv').config();

var connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_ROOT_USERNAME,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'students'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected to database!');
  });

connection.query('select * from courses', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
});

connection.end();