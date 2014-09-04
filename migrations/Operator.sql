USE QSI_TrainSystem;


-- Operator
IF OBJECT_ID('dbo.Operator', 'U') IS NOT NULL
  DROP TABLE dbo.Operator;
  
CREATE TABLE dbo.Operator (
	id int NOT NULL PRIMARY KEY IDENTITY(1,1),
	updatedAt datetime,
	createdAt datetime,

	name nvarchar(200),
	initials nvarchar(10)

);