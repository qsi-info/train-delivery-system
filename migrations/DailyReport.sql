USE QSI_TrainSystem;


-- DailyReport
IF OBJECT_ID('dbo.DailyReport', 'U') IS NOT NULL
  DROP TABLE dbo.DailyReport;
  
CREATE TABLE dbo.DailyReport (
	id int PRIMARY KEY NOT NULL IDENTITY(1,1),
	updatedAt datetime,
	createdAt datetime,

	delivery int,
	deliveryDate datetime,
	receiveTime nvarchar(10),
	railcarCount int,
	emptyRailcarCount int,
	netVolBBL float,
	sample nvarchar(5),
	flowMeter float,
	comments nvarchar(200)
)	