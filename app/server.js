'use server';
const mysql = require('mysql2');
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
require('dotenv').config();

const SEARCH_LIMIT = 1000;

var connectionConfig = {
    host: 'localhost',
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_ROOT_USERNAME,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'appointments',
};

export async function getPatientCount() {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select count(*) as total from patients`;
    let results = await connection.promise().query(sql);
    console.log(results[0]);
    connection.end();
    return results[0][0];
}

export async function getPhysicianCount() {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select count(*) as total from physicians`;
    let results = await connection.promise().query(sql);
    console.log(results[0]);
    connection.end();
    return results[0][0];
}

export async function getSpecializationCount() {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select count(*) as total from specializations`;
    let results = await connection.promise().query(sql);
    console.log(results[0]);
    connection.end();
    return results[0][0];
}

export async function getAppointmentCount() {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select count(*) as total from appointments`;
    let results = await connection.promise().query(sql);
    console.log(results[0]);
    connection.end();
    return results[0][0];
}

export async function getPatients(name) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select PatientID as ID, name as Patient, DOB as 'Date of Birth', ContactInfo as 'Contact Info'
    from patients 
    where name like ? 
    order by name, patientid
    limit ${SEARCH_LIMIT}`;
    let results = await connection.promise().query(sql, ['%' + name + '%']);
    console.log(results[0]);
    connection.end();
    return results[0];
}

export async function getPhysicians(physician, specialization, contact) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select PhysicianID as ID, name as Physician, Description as Specialization, ContactInfo as 'Contact Info'
    from physicians 
    join specializations
    using (specializationid)
    where name like ? 
    ${specialization ? 'and description like ? ' : ''} 
    ${contact ? 'and contactInfo like ?' : ''}
    order by name, physicianid
    limit ${SEARCH_LIMIT}`;
    let vals = [physician];
    if (specialization) {
        vals.push(specialization);
    }
    if (contact) {
        vals.push(contact);
    }
    vals = vals.map((x) => '%' + x + '%');
    let results = await connection.promise().query(sql, vals);
    console.log(results[0]);
    connection.end();
    return results[0];
}

export async function getSpecializations(name) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select * from specializations
    where description like ? 
    order by description
    limit ${SEARCH_LIMIT}`;
    let results = await connection.promise().query(sql, ['%' + name + '%']);
    console.log(results[0]);
    connection.end();
    return results[0];
}

export async function getAppts(patientName, physicianName, date) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select AppointmentID as ID, pa.name as Patient, p.name as Physician, Date, StartTime, EndTime
    from appointments a
    join physicians p
    using (physicianid)
    join patients pa
    using (patientid)
    where pa.name like ?
    and p.name like ? 
    ${date ? 'and date = ? ' : ''}
    order by pa.name, p.name, date desc, starttime desc, endtime desc
    limit ${SEARCH_LIMIT}`;
    let vals = [patientName, physicianName];
    vals = vals.map((x) => '%' + x + '%');
    if (date) {
        vals.push(date);
    }
    console.log(sql);
    console.log(vals);
    let [results, fields] = await connection.promise().query(sql, vals);
    console.log(results);
    if (results[0]) {
        console.log(Object.keys(results[0]));
    }
    connection.end();
    return results;
}

export async function getApptCounts() {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select date, count(*) as total 
    from appointments 
    where YEAR(date) = YEAR(NOW())
    group by 1 
    order by 1`;
    let results = await connection.promise().query(sql);
    console.log(results[0]);
    connection.end();
    return results[0];
}

export async function getAgesAppointments() {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select PatientID, GREATEST(FLOOR(DATEDIFF(NOW(), DOB) / 365), 0) as age, count(*) as total 
        from appointments 
        join patients using (PatientID)
        where date >= DATE_SUB(NOW(), INTERVAL 3 YEAR)
        group by PatientID, DOB
        order by 1`;
    let results = await connection.promise().query(sql);
    console.log(results[0]);
    connection.end();
    return results[0];
}

export async function getVacations(name) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select v.VacationID as ID, p.name as Physician, StartDate, EndDate, Reason as Description, VacationStatus as Status
    from vacations v
    join physicians p
    using (physicianid)
    where p.name like ?
    order by p.name, startdate desc, enddate desc
    limit ${SEARCH_LIMIT}`;
    let results = await connection.promise().query(sql, ['%' + name + '%']);
    console.log(results[0]);
    connection.end();
    return results[0];
}

export async function getPatientName(id) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select name from patients where patientid=?`;
    let results = await connection.promise().query(sql, [id]);
    console.log(results[0][0].name);
    connection.end();
    return results[0][0].name;
}

export async function getPhysicianName(id) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `select name from physicians where physicianid=?`;
    console.log(sql);
    let results = await connection.promise().query(sql, [id]);
    console.log(results[0][0].name);
    connection.end();
    return results[0][0].name;
}

export async function getSpecialtyCounts() {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    const sql = `
            select description, count(*) as total
            from appointments
            join physicians using (physicianid)
            join specializations using (specializationid)
            group by 1
            order by 2 desc;
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
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    const sql = `
        select TIMESTAMPDIFF(YEAR, Patients.DOB, Appointments.Date) as age, count(*) as total
        from Appointments
        join Patients using (PatientID)
        group by 1 
        order by 1;
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

export async function deleteAppointment(id) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `DELETE FROM appointments WHERE appointmentid = ?`;
    let results = await connection.promise().query(sql, [id]);
    console.log(results[0]);
    connection.end();
    revalidatePath('/dashboard/appointments');
}

export async function deleteVacation(id) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `DELETE FROM vacations WHERE vacationid = ?`;
    let results = await connection.promise().query(sql, [id]);
    console.log(results[0]);
    connection.end();
    revalidatePath('/dashboard/vacations');
}

export async function deletePatient(id) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `DELETE FROM patients WHERE patientid = ?`;
    let results = await connection.promise().query(sql, [id]);
    console.log(results[0]);
    connection.end();
    revalidatePath('/dashboard/patients');
}

export async function deletePhysician(id) {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `DELETE FROM physicians WHERE physicianid = ?`;
    let results = await connection.promise().query(sql, [id]);
    console.log(results[0]);
    connection.end();
    revalidatePath('/dashboard/physicians');
}

export async function createPatient(formData) {
    noStore();
    const name = formData.get('name').trim();
    const contact = formData.get('contact').trim();
    const dob = formData.get('dob');
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `INSERT INTO patients (name, contactinfo, dob)
    values (?, ?, ?)`;
    let results = await connection.promise().query(sql, [name, contact, dob]);
    console.log(results[0]);
    connection.end();
    revalidatePath('/dashboard/patients');
    redirect(`/dashboard/patients?patient=${name}`);
}

export async function createPhysician(formData) {
    noStore();
    const name = formData.get('name').trim();
    const specializationid = formData.get('specializationid');
    const contact = formData.get('contact').trim();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `INSERT INTO physicians (name, specializationid, contactinfo)
    values (?, ?, ?)`;
    let results = await connection
        .promise()
        .query(sql, [name, specializationid, contact]);
    console.log(results[0]);
    connection.end();
    revalidatePath('/dashboard/physicians');
    redirect(`/dashboard/physicians?query=${name}`);
}

export async function createAppointment(patientID, physicianID, formData) {
    noStore();
    const db_name = await getPatientName(patientID);
    const date = formData.get('date');
    const starttime = formData.get('starttime');
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `INSERT INTO appointments (patientid, physicianid, date, starttime, endtime)
    values (?, ?, ?, ?, ADDTIME(?, 3000))`;
    console.log(sql);
    try {
        let results = await connection
            .promise()
            .query(sql, [patientID, physicianID, date, starttime, starttime]);
        console.log(results[0].insertId);
        connection.end();
        revalidatePath('/dashboard/appointments');
        redirect(`/dashboard/appointments?patient=${db_name}`);
    } catch (error) {
        connection.end();
        console.log(error);
        throw error;
    }
}

export async function createVacation(formData) {
    noStore();
    const physicianid = formData.get('physicianid');
    const db_name = await getPhysicianName(physicianid);
    const startdate = formData.get('startdate');
    const enddate = formData.get('enddate');
    const description = formData.get('description');
    const status = formData.get('status');
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let sql = `INSERT INTO vacations (physicianid, startdate, enddate, reason, vacationstatus)
    values (?, ?, ?, ?, ?)`;
    console.log(sql);
    try {
        let results = await connection
            .promise()
            .query(sql, [physicianid, startdate, enddate, description, status]);
        console.log(results[0].insertId);
        connection.end();
        revalidatePath('/dashboard/vacations');
        redirect(`/dashboard/vacations?query=${db_name}`);
    } catch (error) {
        connection.end();
        console.log(error);
        throw error;
    }
}

export async function updatePatient(id, formData) {
    noStore();
    const name = formData.get('name').trim();
    const db_name = await getPatientName(id);
    const contact = formData.get('contact').trim();
    const dob = formData.get('dob');

    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });

    let updatedFields = [];
    if (name) {
        updatedFields.push(`name='${name}'`);
    }
    if (contact) {
        updatedFields.push(`contactinfo='${contact}'`);
    }
    if (dob) {
        updatedFields.push(`dob='${dob}'`);
    }

    let sql =
        `UPDATE patients SET ` + updatedFields.join(',') + ` WHERE patientid=${id}`;
    let results = await connection.promise().query(sql);
    connection.end();
    revalidatePath('/dashboard/patients');
    redirect(`/dashboard/patients?patient=${db_name}`);
}

export async function updatePhysician(id, formData) {
    noStore();
    const name = formData.get('name').trim();
    const specializationid = formData.get('specializationid');
    const contact = formData.get('contact').trim();

    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });
    let updatedFields = [];
    if (name) {
        updatedFields.push(`name='${name}'`);
    }
    if (contact) {
        updatedFields.push(`contactinfo='${contact}'`);
    }
    if (specializationid) {
        updatedFields.push(`specializationid='${specializationid}'`);
    }

    let sql =
        `UPDATE physicians SET ` +
        updatedFields.join(',') +
        ` WHERE physicianid=${id}`;
    console.log(sql);
    let results = await connection.promise().query(sql);
    const db_name = await getPhysicianName(id);
    connection.end();
    revalidatePath('/dashboard/physicians');
    redirect(`/dashboard/physicians?query=${db_name}`);
}

export async function updateAppointment(id, formData) {
    noStore();
    const date = formData.get('date');
    const starttime = formData.get('starttime');
    const duration = formData.get('duration');
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });

    let updatedFields = [];
    if (date) {
        updatedFields.push(`date='${date}'`);
    }
    if (starttime) {
        updatedFields.push(`starttime='${starttime}'`);
    }
    if (duration) {
        updatedFields.push(`endtime=ADDTIME('${starttime}', ${duration * 100})`);
    } else if (starttime) {
        updatedFields.push(`endtime=ADDTIME('${starttime}', ${30 * 100})`);
    }

    let sql =
        `UPDATE appointments SET ` +
        updatedFields.join(',') +
        ` WHERE appointmentid=${id}`;
    console.log(sql);
    let results = await connection.promise().query(sql);
    console.log(results[0].insertId);
    let results2 = await connection
        .promise()
        .query(`select patientid from appointments where appointmentid=${id}`);
    let db_name = await getPatientName(results2[0][0].patientid);
    connection.end();
    revalidatePath('/dashboard/appointments');
    redirect(`/dashboard/appointments?patient=${db_name}`);
}

export async function updateVacation(id, formData) {
    noStore();
    const startdate = formData.get('startdate');
    const enddate = formData.get('enddate');
    const description = formData.get('description');
    const status = formData.get('status');
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });

    let updatedFields = [];
    if (startdate) {
        updatedFields.push(`startdate='${startdate}'`);
    }
    if (enddate) {
        updatedFields.push(`enddate='${enddate}'`);
    }
    if (description) {
        updatedFields.push(`description='${description}'`);
    }
    if (status) {
        updatedFields.push(`vacationstatus='${status}'`);
    }

    let sql =
        `UPDATE vacations SET ` +
        updatedFields.join(',') +
        ` WHERE vacationid=${id}`;
    console.log(sql);
    let results = await connection.promise().query(sql);
    console.log(results[0].insertId);
    let results2 = await connection
        .promise()
        .query(`select physicianid from vacations where vacationid=${id}`);
    let db_name = await getPhysicianName(results2[0][0].physicianid);
    connection.end();
    revalidatePath('/dashboard/vacations');
    redirect(`/dashboard/vacations?query=${db_name}`);
}

export async function getAppointmentsByPhysician() {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
    });
    let sql =
        'select Appointments.PhysicianID, Appointments.AppointmentID, Appointments.Date, Appointments.StartTime,' +
        'Appointments.EndTime, Appointments.PatientID, Appointments.AppointmentStatus from Appointments left join' +
        'Physicians on Appointments.PhysicianID = Physicians.PhysicianID order by PhysicianID, StartTime';
    let results = await connection.promise().query(sql);
    connection.end();
    return results[0];
}

export async function getAppointmentsByDayofWeek() {
    noStore();
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
    });
    let sql = `
        select DAYOFWEEK(Date) as dayofweek, count(*) as total 
        from Appointments 
        group by 1
        order by 1`;
    let results = await connection.promise().query(sql);
    connection.end();
    return results[0];
}
