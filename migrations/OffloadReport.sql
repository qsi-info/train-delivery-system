USE QSI_TrainSystem;


-- OffloadReport
IF OBJECT_ID('dbo.OffloadReport', 'U') IS NOT NULL
  DROP TABLE dbo.OffloadReport;
  
CREATE TABLE dbo.OffloadReport (
	id int PRIMARY KEY NOT NULL IDENTITY(1,1),
	updatedAt datetime,
	createdAt datetime,

	delivery int,

	number nvarchar(10),
	netVolBBL	float,
	billOfLading	nvarchar(20),
	product	nvarchar(10),
	currentETA	datetime,
	origin	nvarchar(20),
	netVolLTR	float,
	destination	nvarchar(20),
	destinationState	nvarchar(4),
	originState	nvarchar(5),
	CLM	nvarchar(1),
	CLMLocation	nvarchar(25),
	record	nchar(10),
	adjustedVol	nvarchar(20),
	offloadSTPNetVol	nvarchar(20),
	carrier	nvarchar(20),
	orderNo	nvarchar(20),
	entryType	nvarchar(20),
	offloadStatus	nvarchar(20),
	operator	nvarchar(20),
	sourceFileDate	nvarchar(20),
	shipDate	datetime,

);
		