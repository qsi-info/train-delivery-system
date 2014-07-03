create table ReportEndDay (
	id char(36),
	createdAt datetime,
	updatedAt datetime,

	product nvarchar(10),
	netVolBBL float,

	number nvarchar(10),

	destination nvarchar(20),

	billOfLading nvarchar(20)
);