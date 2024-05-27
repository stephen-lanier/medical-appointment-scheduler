create database appointments;
use appointments;

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

-- trigger: insertion on appointments, check that physician/time not already blocked
-- user roles?

