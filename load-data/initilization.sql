create database appointments;
use appointments;
select * from appointments;

select * from appointments
where date > '2024-05-01';

select s.description, count(*) 
from physicians p
join specializations s on p.specializationid=s.specializationid
group by 1
order by 2 desc;

select s.description, count(*)
from appointments a
join physicians p on a.physicianid=p.physicianid
join specializations s on p.specializationid=s.specializationid
group by 1
order by 2 desc;

create table Patients (
	PatientID serial primary key,
    `Name` varchar(50) not null,
    ContactInfo varchar(50),
    DOB date not null
);

create table Specializations (
	SpecializationID int primary key,
    `Description` varchar(50) not null
);

create table Physicians(
	PhysicianID serial primary key,
	`Name` varchar(50) not null,
    SpecializationID int references Specializations(SpecializationID),
    ContactInfo varchar(50) not null
);

create table Appointments (
	AppointmentID serial primary key,
	`Date` date not null,
    StartTime time not null,
    EndTime time not null,
    PatientID int references Patients(PatientID),
    PhysicianID int references Physicians(PhysicianID),
    AppointmentStatus varchar(10)
);

create table Vacations (
	VacationID serial primary key,
    PhysicianID int references Physicians(PhysicianID),
    StartDate date not null,
    EndDate date not null,
    VacationStatus varchar(20),
    Reason varchar(50)
);