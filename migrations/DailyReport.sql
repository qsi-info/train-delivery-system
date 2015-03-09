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









-- SELECT
-- 	MAX(dbo.Delivery.createdAt) AS DeliveryDate,
-- 	SUM(dbo.RailcarInDelivery.netVolBBL) AS DeliveryVolBBL, 
-- 	COUNT(dbo.RailcarInDelivery.id) AS DeliveryCarCount
-- 	FROM dbo.RailcarInDelivery 
-- 		INNER JOIN dbo.Delivery ON dbo.RailcarInDelivery.delivery = dbo.Delivery.id
-- 	WHERE dbo.RailcarInDelivery.delivery = 
-- 	(SELECT MAX(dbo.RailcarInDelivery.delivery) AS DeliveryMax FROM dbo.RailcarInDelivery)














