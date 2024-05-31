const mysql = require("mysql2");
import { unstable_noStore as noStore } from 'next/cache';
require('dotenv').config();

var connectionConfig = {
    host: 'localhost',
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_ROOT_USERNAME,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'appointments'
};

export async function getAppts(userID) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select * from appointments a
    join physicians p
    using (physicianid)
    where patientid=${userID}
    order by date desc`;
    let results = await connection.promise().query(sql);
    // console.log(results[0])
    connection.end();
    return results[0];
}

export async function getPatientName(userID) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select name from patients where patientid=${userID}`;
    let results = await connection.promise().query(sql);
    console.log(results[0][0].name)
    connection.end();
    return results[0][0].name;
}

export async function getPhysiciansAndSpecialties() {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });

    const sql = `
        SELECT Physicians.Name AS PhysicianName, Specializations.Description AS Specialty
        FROM Physicians
        JOIN Specializations ON Physicians.SpecializationID = Specializations.SpecializationID;
    `;

    try {
        const [results, fields] = await connection.promise().query(sql);
        console.log('Physicians and Specialties: ', results);
        connection.end();
        return results;
    } catch (error) {
        console.error('Failed to execute query: ', error);
        connection.end();
        throw error;
    }
}

export async function getAppointmentsByAge() {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });

    const sql = `
        SELECT Appointments.*, TIMESTAMPDIFF(YEAR, Patients.DOB, Appointments.Date) AS Age
        FROM Appointments
        JOIN Patients ON Appointments.PatientID = Patients.PatientID;
    `;

    try {
        const [results, fields] = await connection.promise().query(sql);
        console.log('Appointments and Ages: ', results);
        connection.end();
        return results;
    } catch (error) {
        console.error('Failed to execute query: ', error);
        connection.end();
        throw error;
    }
}