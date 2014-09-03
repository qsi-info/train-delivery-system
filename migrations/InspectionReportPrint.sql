USE QSI_TrainSystem;


-- InspectionReportPrint
IF OBJECT_ID('dbo.InspectionReportPrint', 'U') IS NOT NULL
  DROP TABLE dbo.InspectionReportPrint;
  
CREATE TABLE dbo.InspectionReportPrint (
	id int NOT NULL ,
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