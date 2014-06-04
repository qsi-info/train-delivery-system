
create table ReportInspectionSheet (
	id char(36),
	createdAt datetime,
	updatedAt datetime,
	seal1 nvarchar(6),
	seal2 nvarchar(6),
	seal3 nvarchar(6),
	product nvarchar(10),
	netVolBBL float,
	train nvarchar(25),
	number nvarchar(10),
	spot nvarchar(10),
	billOfLading nvarchar(20)
);