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

DROP TRIGGER IF EXISTS PhysicianAvailability;
DELIMITER //
CREATE TRIGGER PhysicianAvailability
BEFORE INSERT ON Appointments
FOR EACH ROW
BEGIN
    DECLARE conflict_count INT;
    SET conflict_count = (
        SELECT COUNT(*)
        FROM Appointments
        WHERE PhysicianID = New.PhysicianID
        AND `Date` = New.Date
        AND (
			(New.StartTime >= StartTime AND New.StartTime < EndTime)
            OR (New.EndTime > StartTime AND New.EndTime <= EndTime)
            OR (StartTime >= New.StartTime AND StartTime < New.EndTime)
--             (New.StartTime BETWEEN StartTime AND EndTime)
--             OR (New.EndTime BETWEEN StartTime AND EndTime)
--             OR (StartTime BETWEEN New.StartTime AND New.EndTime)
        )
    );
    IF conflict_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot schedule appointment: Time conflict exists for the physician.';
    END IF;
END //
DELIMITER ;
