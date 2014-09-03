USE QSI_TrainSystem;


-- RailcarInDelivery
IF OBJECT_ID('dbo.RailcarInDelivery', 'U') IS NOT NULL
  DROP TABLE dbo.RailcarInDelivery;
  
CREATE TABLE dbo.RailcarInDelivery (
	id int PRIMARY KEY NOT NULL IDENTITY(1,1),
	updatedAt datetime,
	createdAt datetime,

	CNRailcarID char(36),
	delivery int,
	number char(10),
	netVolBBL float,
	spot nvarchar(10),
	isDefective bit default 0,
	informations nvarchar(max),

);