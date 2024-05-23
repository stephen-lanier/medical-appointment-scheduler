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



insert into Products values ('012345678901',
'Strawberry ice cream',
'1 liter container with organic ice cream, strawberry flavor',
100,
5.49
);
insert into Products values ('012345678902',
'Vanilla ice cream',
'1 liter container with organic ice cream, vanilla flavor',
2,
5.49
);
insert into Products values ('012345678903',
'Chocolate ice cream',
'1 liter container with organic ice cream, chocolate flavor',
100,
5.49
);
insert into Products values ('112345678901',
'Chocolate box',
'1 pound box, 20 pieces of gourmet dark chocolate truffles',
50,
19.99
);
insert into Customers values (1, 'Bruno Guardia');
insert into ShoppingCart values (1, '112345678901', 1, 19.99, 19.99);
insert into ShoppingCart values (1, '012345678902', 3, 5.49, 16.47);
select * from Products;
select * from Customers;
select * from ShoppingCart;
