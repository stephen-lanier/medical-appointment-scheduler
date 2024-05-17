import stripBomStream from 'strip-bom-stream';
import fs from 'fs';
import csv from 'csv-parser';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import ProgressBar from 'progress';
dotenv.config();
var connectionConfig = {
    host: 'localhost',
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_ROOT_USERNAME,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'appointments'
};

const rawFp = 'data/raw.csv';
const specialtiesFp = 'data/specialties.csv'
let results = [];
let ageDist = {};
let specialityDist = {};
let sexDist = {};
let ages = [];
let sexes = [];
let specialties = [];
let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
let days = Array.from({ length: 30 }, (x, i) => i + 1);
let months = Array.from({ length: 12 }, (x, i) => i + 1);


// load Specialization table
// fs.createReadStream(specialtiesFp)
//     .pipe(stripBomStream())
//     .pipe(csv())
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//         insertSpecialties(pairs);
//     });

async function insertSpecialties() {
    let pairs = results.map(x => {
        return '(' + x.ID + ', "' + x.SPECIALTY + '")';
    })
    results = [];

    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to database!');
    });

    let res = await connection.promise().query('insert into Specializations values ' + pairs.join(', '));
    connection.end();
    console.log(`inserted ${res[0].affectedRows} row(s) into Specializations`);
}

// load raw data and get distributions for age, specialization, sex
fs.createReadStream(rawFp)
    .pipe(stripBomStream())
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        getDists();
        generatePhysiciansTable(1)
            .then(
                () => generatePatientsTable(1)
            )
            .then(
                () => generateAppointmentsTable()
            );
    });


function getDists() {
    results.map(x => {
        ageDist[x.edad] = ageDist[x.edad] ? ageDist[x.edad] + 1 : 1;
        sexDist[x.sexo] = sexDist[x.sexo] ? sexDist[x.sexo] + 1 : 1;
        specialityDist[x.especialidad] = specialityDist[x.especialidad] ? specialityDist[x.especialidad] + 1 : 1;
    })
    for (var age in ageDist) {
        ageDist[age] /= results.length;
        ages = ages.concat(Array(Math.ceil(ageDist[age] * 1000)).fill(age));
    }
    for (var specialty in specialityDist) {
        specialityDist[specialty] /= results.length;
        specialties = specialties.concat(Array(Math.ceil(specialityDist[specialty] * 1000)).fill(specialty));
    }
    for (var sex in sexDist) {
        sexDist[sex] /= results.length;
        sexes = sexes.concat(Array(Math.ceil(sexDist[sex] * 1000)).fill(sex));
    }
}

async function generatePhysiciansTable(n) {
    let bar = new ProgressBar('  preparing physicians table\t [:bar] :rate/bps :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: n
    });

    let pairs = [];
    for (let i = 0; i < n; i++) {
        bar.tick();
        pairs.push(`('${getRandomName()}', ${getRandom(specialties)}, '')`);
    }

    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        // console.log('connected to database!');
    });
    let sql = `insert into Physicians (Name, SpecializationID, ContactInfo) values ` + pairs.join(', ');

    let res = await connection.promise().query(sql);
    connection.end();
    console.log(`inserted ${res[0].affectedRows} row(s) into Physicians`);
}

async function generatePatientsTable(n) {
    let bar = new ProgressBar('  preparing patients table\t [:bar] :rate/bps :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: n
    });

    let pairs = [];
    for (let i = 0; i < n; i++) {
        bar.tick();
        let DOB = `${2024 - getRandom(ages)}-` + getRandomDate();
        pairs.push(`('${getRandomName()}', '', '${DOB}')`);
    }
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        // console.log('connected to database!');
    });
    let sql = `insert into Patients (Name, ContactInfo, DOB) values ` + pairs.join(', ');

    let res = await connection.promise().query(sql);
    connection.end();
    console.log(`inserted ${res[0].affectedRows} row(s) into Patients`);
}

async function generateAppointmentsTable() {
    let pairs = [];
    let bar = new ProgressBar('  preparing appointments table\t [:bar] :rate/bps :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: results.length
    });

    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        // console.log('connected to database!');
    });

    for (var i in results) {
        bar.tick();
        let patients = await getPatientsByAge(results[i].edad);
        patients = patients[0].map(x => x.PatientID)
        let physicians = await getPhysiciansBySpecialty(results[i].especialidad);
        physicians = physicians[0].map(x => x.PhysicianID);
        let m = results[i].reserva_mes_d;
        m = m.length < 2 ? '0' + m : m;
        let d = results[i].reserva_dia_d;
        d = d.length < 2 ? '0' + d : d;
        let pair = `('Pending', ${getRandom(physicians)}, ${getRandom(patients)}, '2024-${m}-${d}', CURRENT_TIME(), ADDTIME(CURRENT_TIME(), 3000))`;
        let sql = `insert into Appointments (AppointmentStatus, PhysicianID, PatientID, Date, StartTime, EndTime) values ` + pair;
        let res = await connection.promise().query(sql);
        // pairs.push(pair);
    }
    
    connection.end();
    console.log(`inserted ${results.length} row(s) into Appointments`);

}

async function getPatientsByAge(age) {
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        // console.log('connected to database!');
    });

    let sql = `select PatientID from patients where year(DOB)=${2024 - age}`;
    let res = await connection.promise().query(sql);
    connection.end();
    return res;
}

async function getPhysiciansBySpecialty(specialty) {
    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        // console.log('connected to database!');
    });

    let sql = `select PhysicianID from Physicians where SpecializationID=${specialty}`;
    let res = await connection.promise().query(sql);
    connection.end();
    return res;
}

function getRandom(arr) {
    if (arr.length === 0) { return 1; }
    let size = arr.length;
    let i = Math.floor(Math.random() * size);
    return arr[i];
}

function getRandomName() {
    var name = '';
    for (var i = 0; i < 10; i++) {
        let index = Math.floor(Math.random() * chars.length)
        name += chars[index];
    }
    return name;
}

function getRandomDate() {
    let month = `${getRandom(months)}`;
    month = month.length < 2 ? '0' + month : month;
    let day = `${getRandom(days)}`;
    day = (month === '02' && ['29', '30'].includes(day)) ? '28' : day;
    return (month + '-' + day);
}

// load random physicians from especialidad
// load random ID
// if ID already in system and specializations DO match:
// continue;
// else if ID already in system and specializations DON'T match:
// regenerate random ID try again
// else
// insert w/ random name
// load random patients from edad
// if ID already in system adn edads DO match:
// continue;
// else if ID already in system and edads DON'T match:
// regenerate random ID try again
// else
// insert w/ random name