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

DELIMITER //
CREATE TRIGGER PhysicianAvailability
BEFORE INSERT ON Appointments
FOR EACH ROW
BEGIN
    DECLARE conflict_count INT;
    SELECT COUNT(*) INTO conflict_count
    FROM Appointments
    WHERE New.PhysicianID = PhysicianID
      AND New.Date = Date
      AND NOT (New.StartTime >= EndTime OR New.EndTime <= StartTime);

    IF conflict1_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot schedule appointment: Time conflict exists for the physician.';
    END IF;
END;
DELIMITER;

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


-- Nic's Query
-- Physicians/Speciality
SELECT Physicians.Name AS PhysicianName, Specializations.Description AS Specialty
FROM Physicians
JOIN Specializations ON Physicians.SpecializationID = Specializations.SpecializationID;
-- Appointments by age
SELECT Appointments.*, TIMESTAMPDIFF(YEAR, Patients.DOB, Appointments.Date) AS Age
FROM Appointments
JOIN Patients ON Appointments.PatientID = Patients.PatientID;
