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

DROP TRIGGER IF EXISTS before_insert_appointments;
DELIMITER //
CREATE TRIGGER before_insert_appointments
BEFORE INSERT ON Appointments
FOR EACH ROW
BEGIN
    DECLARE conflict_count INT;
    SET conflict_count = (
        SELECT COUNT(*)
        FROM (
			select physicianid, `date` as startdate, `date` as enddate, starttime, endtime
            from appointments
            union (
				select physicianid, startdate, enddate, '00:00:00' as starttime, '23:59:59' as enddtime
                from vacations
            )
        ) as a
        WHERE PhysicianID = New.PhysicianID
        AND (
			(New.Date BETWEEN StartDate AND EndDate)
			AND (
				(New.StartTime >= StartTime AND New.StartTime < EndTime)
				OR (New.EndTime > StartTime AND New.EndTime <= EndTime)
				OR (StartTime >= New.StartTime AND StartTime < New.EndTime)
			)
        )
    );
    IF conflict_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot schedule appointment: Time conflict exists for the physician.';
    END IF;
END //
DELIMITER ;


DROP TRIGGER IF EXISTS before_insert_vacations;
DELIMITER //
CREATE TRIGGER before_insert_vacations
BEFORE INSERT ON vacations
FOR EACH ROW
BEGIN
    DECLARE conflict_count INT;
    SET conflict_count = (
        SELECT COUNT(*)
        FROM (
			select physicianid, `date` as startdate, `date` as enddate
            from appointments
            union (
				select physicianid, startdate, enddate
                from vacations
            )
        ) as a
        WHERE PhysicianID = New.PhysicianID
        AND (
			(New.StartDate BETWEEN StartDate AND EndDate)
            OR (New.EndDate BETWEEN StartDate AND EndDate)
            OR (StartDate BETWEEN New.StartDate AND New.EndDate)
            OR (EndDate BETWEEN New.StartDate AND New.EndDate)
        )
    );
    IF conflict_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot schedule vacation: Scheduling conflicts exist.';
    END IF;
END //
DELIMITER ;
