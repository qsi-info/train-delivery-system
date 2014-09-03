INSERT INTO dbo.dev_CarsAtStation (number, train, netVolBBL, billOfLading, product, seal1, seal2, seal3, currentETA, origin, netVolLTR, destination, destinationState, originState, CLM, CLMLocation, ShipDate)

SELECT Railcar, TrainId, NetVolBBL, BillofLading, Product, Seal1, Seal2, Seal3, CurrentETA, RtOrigin, NetVolLtr, RtDestination, DeSt, OrSt, CLM, CLMLocation, ShipDate

FROM         dbo.Loadedcars1

WHERE     (CLMLocation LIKE '%PQ') AND ((Railcar + Seal1 + Seal2 + Seal3 + BillofLading) NOT IN 
					(SELECT dbo.dev_CarsAtStation.number + seal1 + seal2 + seal3 + billOfLading AS Expr1
            FROM dbo.dev_CarsAtStation AS CarsAtStation_1))





             -- AND ((Railcar + Seal1 + Seal2 + Seal3 + BillofLading) NOT IN
             --  (SELECT     dbo.Loadedcars1.Railcar + seal1 + seal2 + seal3 + billOfLading AS Expr1

             --                FROM          dbo.ArchiveRailcar AS ArchiveRailcar_1))


select count(*) from dev_Carsatstation 


INSERT INTO dbo.dev_CarsAtStation 
	(number, 
	 train, 
	 netVolBBL, 
	 billOfLading, 
	 product, 
	 seal1, 
	 seal2, 
	 seal3, 
	 currentETA, 
	 origin, 
	 netVolLTR, 
	 destination, 
	 destinationState, 
	 originState, 
	 CLM, 
	 CLMLocation, 
	 ShipDate)

SELECT 
	Railcar, 
	TrainId, 
	NetVolBBL, 
	BillofLading, 
	Product, 
	Seal1, 
	Seal2, 
	Seal3, 
	CurrentETA, 
	RtOrigin, 
	NetVolLtr, 
	RtDestination, 
	DeSt, 
	OrSt, 
	CLM, 
	CLMLocation, 
	ShipDate


	FROM dbo.Loadedcars1

	WHERE 
		(dbo.Loadedcars1.CLMLocation LIKE '%PQ%') 
		AND 
		((dbo.Loadedcars1.Railcar + dbo.Loadedcars1.billOfLading) NOT IN 
				(SELECT dbo.dev_CarsAtStation.number + dbo.dev_CarsAtStation.billOfLading FROM dbo.dev_CarsAtStation))

		AND
		((dbo.Loadedcars1.Railcar + dbo.Loadedcars1.billOfLading) NOT IN 
				(SELECT dbo.ArchiveRailcar.number + dbo.ArchiveRailcar.billOfLading FROM dbo.ArchiveRailcar))


