'use server';
const mysql = require("mysql2");
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
require('dotenv').config();

const SEARCH_LIMIT = 1000;

var connectionConfig = {
    host: 'localhost',
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_ROOT_USERNAME,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'appointments'
};

export async function getPatients(name) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select * from patients 
    where name like '%${name}%' 
    order by name, patientid
    limit ${SEARCH_LIMIT}`;
    let results = await connection.promise().query(sql);
    console.log(results[0]);
    connection.end();
    return results[0];
}

export async function getPhysicians(name) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select * from physicians 
    join specializations
    using (specializationid)
    where name like '%${name}%' 
    order by name, physicianid
    limit ${SEARCH_LIMIT}`;
    let results = await connection.promise().query(sql);
    console.log(results[0]);
    connection.end();
    return results[0];
}

// export async function getPhysicians() {
//     noStore();
//     let connection = mysql.createConnection(connectionConfig);
//     connection.connect(function (err) {
//         if (err) {
//             console.error('error connecting: ' + err.stack);
//             return;
//         }
//         console.log('connected to database!');
//     });
//     let sql = `select physicianid, name from physicians order by name, physicianid`;
//     let results = await connection.promise().query(sql);
//     console.log(results[0]);
//     connection.end();
//     return results[0];
// }

export async function getAppts(username) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select *, p.name as PhysicianName, pa.name as PatientName from appointments a
    join physicians p
    using (physicianid)
    join patients pa
    using (patientid)
    where pa.name like '%${username}%'
    order by pa.name, p.name, date desc, starttime desc, endtime desc
    limit ${SEARCH_LIMIT}`;
    let results = await connection.promise().query(sql);
    console.log(results[0]);
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

export async function deleteAppointment(id) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `DELETE FROM appointments WHERE appointmentid = ${id}`;
    let results = await connection.promise().query(sql);
    console.log(results[0])
    connection.end();
    revalidatePath('/dashboard/appointments');
}

export async function deletePatient(id) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `DELETE FROM patients WHERE patientid = ${id}`;
    let results = await connection.promise().query(sql);
    console.log(results[0])
    connection.end();
    revalidatePath('/dashboard/patients');
}

export async function deletePhysician(id) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `DELETE FROM physicians WHERE physicianid = ${id}`;
    let results = await connection.promise().query(sql);
    console.log(results[0])
    connection.end();
    revalidatePath('/dashboard/physicians');
}