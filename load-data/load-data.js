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
let dayDist = {};
let ages = [];
let sexes = [];
let specialties = [];
let dows = [];
let datesByDow = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
};
let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
let days = Array.from({ length: 30 }, (x, i) => i + 1);
let months = Array.from({ length: 12 }, (x, i) => i + 1);

// load datesByDow so 0 contains list of every sunday of the year, 1 a list of every monday, etc.
for (var m = 1; m <= 12; m++) {
    let max;
    if (m === 2) {max = 28;}
    else if ([1, 3, 5, 7, 8, 10, 12].includes(m)) {max = 31;}
    else {max = 30;}

    let month = `${m}`;
    month = month.length < 2 ? '0' + month : month;
    for (var d = 1; d <= max; d++) {
        let day = `${d}`;
        day = day.length < 2 ? '0' + day : day;
        let dow = (new Date(`${month}-${day}-2024`)).getDay();
        datesByDow[dow].push(`2024-${month}-${day}`);
    }
}


fs.createReadStream(specialtiesFp)              // first load specialties data file
    .pipe(stripBomStream())
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        insertSpecialties()                     // insert into DB specialties table
            .then(() => {
                results = [];
                fs.createReadStream(rawFp)      // load raw appointment data
                    .pipe(stripBomStream())
                    .pipe(csv())
                    .on('data', (data) => results.push(data))
                    .on('end', () => {
                        console.log('raw data loaded.');
                        getDists();             // generate distribution data (3% general practictioner, etc.) for below
                        generatePhysiciansTable(700)        // generate mock data and insert into DB physicians table
                            .then(() => generatePatientsTable(20000))   // generate mock data and insert into DB patients table
                            .then(() => generateAppointmentsTable());   // generate mock data and insert into DB appointments table
                    });
            });
    });

async function insertSpecialties() {
    let pairs = results.map(x => '(' + x.ID + ', "' + x.SPECIALTY + '")');

    let connection = mysql.createConnection(connectionConfig);
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        // console.log('connected to database!');
    });

    let res = await connection.promise().query('insert into Specializations values ' + pairs.join(', '));
    connection.end();
    console.log(`inserted ${res[0].affectedRows} row(s) into Specializations`);
}

function getDists() {
    results.map(x => {
        ageDist[x.edad] = ageDist[x.edad] ? ageDist[x.edad] + 1 : 1;
        sexDist[x.sexo] = sexDist[x.sexo] ? sexDist[x.sexo] + 1 : 1;
        specialityDist[x.especialidad] = specialityDist[x.especialidad] ? specialityDist[x.especialidad] + 1 : 1;
        let m = x.reserva_mes_d;
        m = m.length < 2 ? '0'+m : m;
        let d = x.reserva_dia_d;
        d = d.length < 2 ? '0'+d : d;
        let dow = new Date(`${m}-${d}-2024`);
        dow = dow.getDay();
        dayDist[dow] = dayDist[dow] ? dayDist[dow] + 1 : 1;
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
    for (var dow in dayDist) {
        dayDist[dow] /= results.length;
        dows = dows.concat(Array(Math.ceil(dayDist[dow] * 1000)).fill(dow));
    }
    console.log('distributions loaded.');
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

    let schedulingConflicts = 0;
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
        let dow = (new Date(`${m}-${d}-2024`)).getDay();
        let datestring = datesByDow[dow][Math.floor(Math.random() * datesByDow[dow].length)]
        let h = results[i].reserva_hora_d;
        h = h.length < 2 ? '0' + h : h;
        h += ':00:00';
        let pair = `('Pending', ${getRandom(physicians)}, ${getRandom(patients)}, '${datestring}', '${h}', ADDTIME('${h}', 3000))`;
        let sql = `insert into Appointments (AppointmentStatus, PhysicianID, PatientID, Date, StartTime, EndTime) values ` + pair;
        try {
            let res = await connection.promise().query(sql);
        } catch (error) {
            // console.error(error);
            schedulingConflicts++;
            continue;
        }
    }

    connection.end();
    console.log(`${schedulingConflicts} insertions failed due to scheduling conflicts`);
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