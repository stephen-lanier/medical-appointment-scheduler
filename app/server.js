const mysql = require("mysql2");
require('dotenv').config();

var connectionConfig = {
    host: 'localhost',
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_ROOT_USERNAME,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'students'
};


export async function getCourses() {
    // course_id, subject_name
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected to database!');
      });
    
    let results = await connection.promise().query('select * from courses');
    connection.end();
    return results[0];
}

export async function getRegistrations() {
    // student_id, group_id, date, time
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected to database!');
      });
    
    let results = await connection.promise().query('select * from students_registration');
    connection.end();
    return results[0];
}