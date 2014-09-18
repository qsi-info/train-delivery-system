USE QSI_TrainSystem;


-- RailcarInDelivery
IF OBJECT_ID('dbo.RailcarInDelivery', 'U') IS NOT NULL
  DROP TABLE dbo.RailcarInDelivery;
  
CREATE TABLE dbo.RailcarInDelivery (
	id int PRIMARY KEY NOT NULL IDENTITY(1,1),
	updatedAt datetime,
	createdAt datetime,

	CNRailcarID char(36) default null,
	delivery int,
	number char(10),
	netVolBBL float default null,
	spot nvarchar(10),
	billOfLading nvarchar(25) default null,
	isDefective bit default 0,
	informations nvarchar(max) default null,

);