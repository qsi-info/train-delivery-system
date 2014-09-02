USE QSI_TrainSystem;


-- TransferReport
IF OBJECT_ID('dbo.TransferReport', 'U') IS NOT NULL
  DROP TABLE dbo.TransferReport;
  
CREATE TABLE dbo.TransferReport (
	id int PRIMARY KEY NOT NULL IDENTITY(1,1),
	updatedAt datetime,
	createdAt datetime,

	delivery char(36) UNIQUE,
	S55E01_Railcar	nvarchar(10),
	S55E01_Product	nvarchar(10),
	S55E02_Railcar	nvarchar(10),
	S55E02_Product	nvarchar(10),
	S55E03_Railcar	nvarchar(10),
	S55E03_Product	nvarchar(10),
	S55E04_Railcar	nvarchar(10),
	S55E04_Product	nvarchar(10),
	S55E05_Railcar	nvarchar(10),
	S55E05_Product	nvarchar(10),
	S55E06_Railcar	nvarchar(10),
	S55E06_Product	nvarchar(10),
	S55E07_Railcar	nvarchar(10),
	S55E07_Product	nvarchar(10),
	S55E08_Railcar	nvarchar(10),
	S55E08_Product	nvarchar(10),
	S55E09_Railcar	nvarchar(10),
	S55E09_Product	nvarchar(10),
	S55E10_Railcar	nvarchar(10),
	S55E10_Product	nvarchar(10),
	S55E11_Railcar	nvarchar(10),
	S55E11_Product	nvarchar(10),
	S55E12_Railcar	nvarchar(10),
	S55E12_Product	nvarchar(10),
	S55E13_Railcar	nvarchar(10),
	S55E13_Product	nvarchar(10),
	S55E14_Railcar	nvarchar(10),
	S55E14_Product	nvarchar(10),
	S55E15_Railcar	nvarchar(10),
	S55E15_Product	nvarchar(10),
	S56E01_Railcar	nvarchar(10),
	S56E01_Product	nvarchar(10),
	S56E02_Railcar	nvarchar(10),
	S56E02_Product	nvarchar(10),
	S56E03_Railcar	nvarchar(10),
	S56E03_Product	nvarchar(10),
	S56E04_Railcar	nvarchar(10),
	S56E04_Product	nvarchar(10),
	S56E05_Railcar	nvarchar(10),
	S56E05_Product	nvarchar(10),
	S56E06_Railcar	nvarchar(10),
	S56E06_Product	nvarchar(10),
	S56E07_Railcar	nvarchar(10),
	S56E07_Product	nvarchar(10),
	S56E08_Railcar	nvarchar(10),
	S56E08_Product	nvarchar(10),
	S56E09_Railcar	nvarchar(10),
	S56E09_Product	nvarchar(10),
	S56E10_Railcar	nvarchar(10),
	S56E10_Product	nvarchar(10),
	S56E11_Railcar	nvarchar(10),
	S56E11_Product	nvarchar(10),
	S56E12_Railcar	nvarchar(10),
	S56E12_Product	nvarchar(10),
	S56E13_Railcar	nvarchar(10),
	S56E13_Product	nvarchar(10),
	S56E14_Railcar	nvarchar(10),
	S56E14_Product	nvarchar(10),
	S56E15_Railcar	nvarchar(10),
	S56E15_Product	nvarchar(10),
	S57E01_Railcar	nvarchar(10),
	S57E01_Product	nvarchar(10),
	S57E02_Railcar	nvarchar(10),
	S57E02_Product	nvarchar(10),
	S57E03_Railcar	nvarchar(10),
	S57E03_Product	nvarchar(10),
	S57E04_Railcar	nvarchar(10),
	S57E04_Product	nvarchar(10),
	S57E05_Railcar	nvarchar(10),
	S57E05_Product	nvarchar(10),
	S57E06_Railcar	nvarchar(10),
	S57E06_Product	nvarchar(10),
	S57E07_Railcar	nvarchar(10),
	S57E07_Product	nvarchar(10),
	S57E08_Railcar	nvarchar(10),
	S57E08_Product	nvarchar(10),
	S57E09_Railcar	nvarchar(10),
	S57E09_Product	nvarchar(10),
	S57E10_Railcar	nvarchar(10),
	S57E10_Product	nvarchar(10),
	S57E11_Railcar	nvarchar(10),
	S57E11_Product	nvarchar(10),
	S57E12_Railcar	nvarchar(10),
	S57E12_Product	nvarchar(10),
	S57E13_Railcar	nvarchar(10),
	S57E13_Product	nvarchar(10),
	S57E14_Railcar	nvarchar(10),
	S57E14_Product	nvarchar(10),
	S57E15_Railcar	nvarchar(10),
	S57E15_Product	nvarchar(10),
	S58E01_Railcar	nvarchar(10),
	S58E01_Product	nvarchar(10),
	S58E02_Railcar	nvarchar(10),
	S58E02_Product	nvarchar(10),
	S58E03_Railcar	nvarchar(10),
	S58E03_Product	nvarchar(10),
	S58E04_Railcar	nvarchar(10),
	S58E04_Product	nvarchar(10),
	S58E05_Railcar	nvarchar(10),
	S58E05_Product	nvarchar(10),
	S58E06_Railcar	nvarchar(10),
	S58E06_Product	nvarchar(10),
	S58E07_Railcar	nvarchar(10),
	S58E07_Product	nvarchar(10),
	S58E08_Railcar	nvarchar(10),
	S58E08_Product	nvarchar(10),
	S58E09_Railcar	nvarchar(10),
	S58E09_Product	nvarchar(10),
	S58E10_Railcar	nvarchar(10),
	S58E10_Product	nvarchar(10),
	S58E11_Railcar	nvarchar(10),
	S58E11_Product	nvarchar(10),
	S58E12_Railcar	nvarchar(10),
	S58E12_Product	nvarchar(10),
	S58E13_Railcar	nvarchar(10),
	S58E13_Product	nvarchar(10),
	S58E14_Railcar	nvarchar(10),
	S58E14_Product	nvarchar(10),
	S58E15_Railcar	nvarchar(10),
	S58E15_Product	nvarchar(10),
	wagon_count	int,
	baril_count	float,
	delivery_date nvarchar(20)
);






