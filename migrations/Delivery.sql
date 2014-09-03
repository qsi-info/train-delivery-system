USE QSI_TrainSystem;


-- Delivery
IF OBJECT_ID('dbo.Delivery', 'U') IS NOT NULL
  DROP TABLE dbo.Delivery;
  
CREATE TABLE dbo.Delivery (
	id int PRIMARY KEY NOT NULL IDENTITY(1,1),
	updatedAt datetime,
	createdAt datetime,

	status nvarchar(20)


);