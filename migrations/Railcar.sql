
create table dev_Railcar (
	id char(36) default lower(newid()) not null, 
	number nvarchar(10),
	train nvarchar(25),
	isProcessed bit default 0,
	delivery char(36) default null,
	spot nvarchar(10) default null,
	netVolBBL float,
	billOfLading nvarchar(20),
	product nvarchar(10),
	seal1 nvarchar(6),
	seal2 nvarchar(6),
	seal3 nvarchar(6),
	currentETA datetime,
	createdAt datetime,
	updatedAt datetime
);

alter table dev_Railcar add primary key(id);

insert into dev_Railcar (number, train, netVolBBL, billOfLading, product, seal1, seal2, seal3, currentETA)
	select Railcar, TrainID, NetVolBBL, BillofLading, Product, Seal1, Seal2, Seal3, CurrentETA from CarsAtStation;