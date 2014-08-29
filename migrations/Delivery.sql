USE QSI_TrainSystem;


-- Delivery
IF OBJECT_ID('dbo.Delivery', 'U') IS NOT NULL
  DROP TABLE dbo.Delivery;
  
CREATE TABLE dbo.Delivery (
	id char(36) PRIMARY KEY NOT NULL,
	updatedAt datetime,
	createdAt datetime,

	status nvarchar(20)


);