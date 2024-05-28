'use server';
const mysql = require("mysql2");
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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

export async function getSpecializations(name) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select * from specializations
    where description like '%${name}%' 
    order by description
    limit ${SEARCH_LIMIT}`;
    let results = await connection.promise().query(sql);
    console.log(results[0]);
    connection.end();
    return results[0];
}

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

export async function getVacations(name) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select * from vacations v
    join physicians p
    using (physicianid)
    where p.name like '%${name}%'
    order by p.name, startdate desc, enddate desc
    limit ${SEARCH_LIMIT}`;
    let results = await connection.promise().query(sql);
    console.log(results[0]);
    connection.end();
    return results[0];
}

export async function getPatientName(id) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select name from patients where patientid=${id}`;
    let results = await connection.promise().query(sql);
    console.log(results[0][0].name)
    connection.end();
    return results[0][0].name;
}

export async function getPhysicianName(id) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select name from physicians where physicianid=${id}`;
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

export async function deleteVacation(id) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `DELETE FROM vacations WHERE vacationid = ${id}`;
    let results = await connection.promise().query(sql);
    console.log(results[0])
    connection.end();
    revalidatePath('/dashboard/vacations');
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

export async function createPatient(formData) {
    console.log(formData);
    const name = formData.get('name').trim();
    const contact = formData.get('contact').trim();
    const dob = formData.get('dob');
    console.log(name, contact, dob);
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `INSERT INTO patients (name, contactinfo, dob)
    values ('${name}', '${contact}', '${dob}')`;
    let results = await connection.promise().query(sql);
    console.log(results[0])
    connection.end();
    revalidatePath('/dashboard/patients');
    redirect(`/dashboard/patients?query=${name}`);
}

export async function createPhysician(formData) {
    console.log(formData);
    const name = formData.get('name').trim();
    const specializationid = formData.get('specializationid');
    const contact = formData.get('contact').trim();
    console.log(name, specializationid, contact);
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `INSERT INTO physicians (name, specializationid, contactinfo)
    values ('${name}', '${specializationid}', '${contact}')`;
    let results = await connection.promise().query(sql);
    console.log(results[0])
    connection.end();
    revalidatePath('/dashboard/physicians');
    redirect(`/dashboard/physicians?query=${name}`);
}

export async function updatePatient(id, formData) {
    noStore();
    const name = formData.get('name').trim();
    const db_name = await getPatientName(id);
    const contact = formData.get('contact').trim();
    const dob = formData.get('dob');

    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });

    let sql = `
        UPDATE patients SET ` 
        + (name ? `name='${name}' ` : '')
        + (contact ? `contactinfo='${contact}' ` : '')
        + (dob ? `dob='${dob}' ` : '')
        + `WHERE patientid=${id}`;
    let results = await connection.promise().query(sql);
    connection.end();
    revalidatePath('/dashboard/patients');
    redirect(`/dashboard/patients?query=${db_name}`);
}

export async function updatePhysician(id, formData) {
    noStore();
    const name = formData.get('name').trim();
    const db_name = await getPhysicianName(id);
    const specializationid = formData.get('specializationid');
    const contact = formData.get('contact').trim();

    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });

    let sql = `
        UPDATE physicians SET ` 
        + (name ? `name='${name}' ` : '')
        + (contact ? `contactinfo='${contact}' ` : '')
        + (specializationid ? `specializationid='${specializationid}' ` : '')
        + `WHERE physicianid=${id}`;
    let results = await connection.promise().query(sql);
    connection.end();
    revalidatePath('/dashboard/physicians');
    redirect(`/dashboard/physicians?query=${db_name}`);
}