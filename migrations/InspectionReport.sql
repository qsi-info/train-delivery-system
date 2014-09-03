USE QSI_TrainSystem;


-- InspectionReport
IF OBJECT_ID('dbo.InspectionReport', 'U') IS NOT NULL
  DROP TABLE dbo.InspectionReport;
  
CREATE TABLE dbo.InspectionReport (
	id int PRIMARY KEY NOT NULL IDENTITY(1,1),
	updatedAt datetime,
	createdAt datetime,

	delivery int,
	seal1 nvarchar(6),
	seal2 nvarchar(6),
	seal3 nvarchar(6),
	product nvarchar(10),
	netVolBBL float,
	train nvarchar(25),
	number nvarchar(10),
	spot nvarchar(10),
	billOfLading nvarchar(20)

);