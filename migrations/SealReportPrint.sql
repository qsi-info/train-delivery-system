USE QSI_TrainSystem;


-- SealReportPrint
IF OBJECT_ID('dbo.SealReportPrint', 'U') IS NOT NULL
  DROP TABLE dbo.SealReportPrint;
  
CREATE TABLE dbo.SealReportPrint (
		id int PRIMARY KEY NOT NULL,
	updatedAt datetime,
	createdAt datetime,

	delivery int,

	S55E01_Railcar nvarchar(10) ,
	S55E02_Railcar nvarchar(10) ,
	S55E03_Railcar nvarchar(10) ,
	S55E04_Railcar nvarchar(10) ,
	S55E05_Railcar nvarchar(10) ,
	S55E06_Railcar nvarchar(10) ,
	S55E07_Railcar nvarchar(10) ,
	S55E08_Railcar nvarchar(10) ,
	S55E09_Railcar nvarchar(10) ,
	S55E10_Railcar nvarchar(10) ,
	S55E11_Railcar nvarchar(10) ,
	S55E12_Railcar nvarchar(10) ,
	S55E13_Railcar nvarchar(10) ,
	S55E14_Railcar nvarchar(10) ,
	S55E15_Railcar nvarchar(10) ,

	S56E01_Railcar nvarchar(10) ,
	S56E02_Railcar nvarchar(10) ,
	S56E03_Railcar nvarchar(10) ,
	S56E04_Railcar nvarchar(10) ,
	S56E05_Railcar nvarchar(10) ,
	S56E06_Railcar nvarchar(10) ,
	S56E07_Railcar nvarchar(10) ,
	S56E08_Railcar nvarchar(10) ,
	S56E09_Railcar nvarchar(10) ,
	S56E10_Railcar nvarchar(10) ,
	S56E11_Railcar nvarchar(10) ,
	S56E12_Railcar nvarchar(10) ,
	S56E13_Railcar nvarchar(10) ,
	S56E14_Railcar nvarchar(10) ,
	S56E15_Railcar nvarchar(10) ,

	S57E01_Railcar nvarchar(10) ,
	S57E02_Railcar nvarchar(10) ,
	S57E03_Railcar nvarchar(10) ,
	S57E04_Railcar nvarchar(10) ,
	S57E05_Railcar nvarchar(10) ,
	S57E06_Railcar nvarchar(10) ,
	S57E07_Railcar nvarchar(10) ,
	S57E08_Railcar nvarchar(10) ,
	S57E09_Railcar nvarchar(10) ,
	S57E10_Railcar nvarchar(10) ,
	S57E11_Railcar nvarchar(10) ,
	S57E12_Railcar nvarchar(10) ,
	S57E13_Railcar nvarchar(10) ,
	S57E14_Railcar nvarchar(10) ,
	S57E15_Railcar nvarchar(10) ,

	S58E01_Railcar nvarchar(10) ,
	S58E02_Railcar nvarchar(10) ,
	S58E03_Railcar nvarchar(10) ,
	S58E04_Railcar nvarchar(10) ,
	S58E05_Railcar nvarchar(10) ,
	S58E06_Railcar nvarchar(10) ,
	S58E07_Railcar nvarchar(10) ,
	S58E08_Railcar nvarchar(10) ,
	S58E09_Railcar nvarchar(10) ,
	S58E10_Railcar nvarchar(10) ,
	S58E11_Railcar nvarchar(10) ,
	S58E12_Railcar nvarchar(10) ,
	S58E13_Railcar nvarchar(10) ,
	S58E14_Railcar nvarchar(10) ,
	S58E15_Railcar nvarchar(10) ,

	S55E01_01 nvarchar(10), 
	S56E01_01 nvarchar(10),
	S55E02_01 nvarchar(10), 
	S56E02_01 nvarchar(10),
	S55E03_01 nvarchar(10), 
	S56E03_01 nvarchar(10),
	S55E04_01 nvarchar(10), 
	S56E04_01 nvarchar(10),
	S55E05_01 nvarchar(10), 
	S56E05_01 nvarchar(10),
	S55E06_01 nvarchar(10), 
	S56E06_01 nvarchar(10),
	S55E07_01 nvarchar(10), 
	S56E07_01 nvarchar(10),
	S55E08_01 nvarchar(10), 
	S56E08_01 nvarchar(10),
	S55E09_01 nvarchar(10), 
	S56E09_01 nvarchar(10),
	S55E10_01 nvarchar(10), 
	S56E10_01 nvarchar(10),
	S55E11_01 nvarchar(10), 
	S56E11_01 nvarchar(10),
	S55E12_01 nvarchar(10), 
	S56E12_01 nvarchar(10),
	S55E13_01 nvarchar(10), 
	S56E13_01 nvarchar(10),
	S55E14_01 nvarchar(10), 
	S56E14_01 nvarchar(10),
	S55E15_01 nvarchar(10), 
	S56E15_01 nvarchar(10),
	S55E15_02 nvarchar(10), 
	S56E15_02 nvarchar(10),
	S55E14_02 nvarchar(10), 
	S56E14_02 nvarchar(10),
	S55E13_02 nvarchar(10), 
	S56E13_02 nvarchar(10),
	S55E12_02 nvarchar(10), 
	S56E12_02 nvarchar(10),
	S55E11_02 nvarchar(10), 
	S56E11_02 nvarchar(10),
	S55E10_02 nvarchar(10), 
	S56E10_02 nvarchar(10),
	S55E09_02 nvarchar(10), 
	S56E09_02 nvarchar(10),
	S55E08_02 nvarchar(10), 
	S56E08_02 nvarchar(10),
	S55E07_02 nvarchar(10), 
	S56E07_02 nvarchar(10),
	S55E06_02 nvarchar(10), 
	S56E06_02 nvarchar(10),
	S55E05_02 nvarchar(10), 
	S56E05_02 nvarchar(10),
	S55E04_02 nvarchar(10), 
	S56E04_02 nvarchar(10),
	S55E03_02 nvarchar(10), 
	S56E03_02 nvarchar(10),
	S55E02_02 nvarchar(10), 
	S56E02_02 nvarchar(10),
	S55E01_02 nvarchar(10), 
	S56E01_02 nvarchar(10),
	S57E01_01 nvarchar(10), 
	S58E01_01 nvarchar(10),
	S57E02_01 nvarchar(10), 
	S58E02_01 nvarchar(10),
	S57E03_01 nvarchar(10), 
	S58E03_01 nvarchar(10),
	S57E04_01 nvarchar(10), 
	S58E04_01 nvarchar(10),
	S57E05_01 nvarchar(10), 
	S58E05_01 nvarchar(10),
	S57E06_01 nvarchar(10), 
	S58E06_01 nvarchar(10),
	S57E07_01 nvarchar(10), 
	S58E07_01 nvarchar(10),
	S57E08_01 nvarchar(10), 
	S58E08_01 nvarchar(10),
	S57E09_01 nvarchar(10), 
	S58E09_01 nvarchar(10),
	S57E10_01 nvarchar(10), 
	S58E10_01 nvarchar(10),
	S57E11_01 nvarchar(10), 
	S58E11_01 nvarchar(10),
	S57E12_01 nvarchar(10), 
	S58E12_01 nvarchar(10),
	S57E13_01 nvarchar(10), 
	S58E13_01 nvarchar(10),
	S57E14_01 nvarchar(10), 
	S58E14_01 nvarchar(10),
	S57E15_01 nvarchar(10), 
	S58E15_01 nvarchar(10),
	S57E15_02 nvarchar(10), 
	S58E15_02 nvarchar(10),
	S57E14_02 nvarchar(10), 
	S58E14_02 nvarchar(10),
	S57E13_02 nvarchar(10), 
	S58E13_02 nvarchar(10),
	S57E12_02 nvarchar(10), 
	S58E12_02 nvarchar(10),
	S57E11_02 nvarchar(10), 
	S58E11_02 nvarchar(10),
	S57E10_02 nvarchar(10), 
	S58E10_02 nvarchar(10),
	S57E09_02 nvarchar(10), 
	S58E09_02 nvarchar(10),
	S57E08_02 nvarchar(10), 
	S58E08_02 nvarchar(10),
	S57E07_02 nvarchar(10), 
	S58E07_02 nvarchar(10),
	S57E06_02 nvarchar(10), 
	S58E06_02 nvarchar(10),
	S57E05_02 nvarchar(10), 
	S58E05_02 nvarchar(10),
	S57E04_02 nvarchar(10), 
	S58E04_02 nvarchar(10),
	S57E03_02 nvarchar(10), 
	S58E03_02 nvarchar(10),
	S57E02_02 nvarchar(10), 
	S58E02_02 nvarchar(10),
	S57E01_02 nvarchar(10), 
	S58E01_02 nvarchar(10)


);