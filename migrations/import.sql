INSERT INTO dev_CarsAtStation (
	number, train, netVolBBL, billOfLading, product, seal1, seal2, seal3, 
	currentETA, origin, netVolLTR, destination, destinationState, originState, CLM, CLMLocation  
)

SELECT Railcar, TrainId, NetVolBBL, BillOfLading, Product, Seal1, Seal2, Seal3, 
	CurrentETA, RtOrigin, NetVolLtr, RtDestination, DeSt, OrSt, CLM, CLMLocation	

FROM	Loadedcars1
WHERE (CLMLocation LIKE 'Montreal%' OR
       CLMLocation LIKE 'RvrdesPrar%') AND ((Railcar + Seal1 + Seal2 + Seal3) NOT IN
          (SELECT     Railcar + Seal1 + Seal2 + Seal3 AS Expr1 FROM dbo.CarsAtStation AS CarsAtStation_1))