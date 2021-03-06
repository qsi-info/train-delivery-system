module.exports.TrainSystem = {

	wagon_spots: [
		'S55E01', 'S55E02', 'S55E03', 'S55E04', 'S55E05', 'S55E06', 'S55E07', 'S55E08', 'S55E09', 'S55E10', 'S55E11', 'S55E12', 'S55E13', 'S55E14', 'S55E15',
		'S56E01', 'S56E02', 'S56E03', 'S56E04', 'S56E05', 'S56E06', 'S56E07', 'S56E08', 'S56E09', 'S56E10', 'S56E11', 'S56E12', 'S56E13', 'S56E14', 'S56E15',
		'S57E01', 'S57E02', 'S57E03', 'S57E04', 'S57E05', 'S57E06', 'S57E07', 'S57E08', 'S57E09', 'S57E10', 'S57E11', 'S57E12', 'S57E13', 'S57E14', 'S57E15',
		'S58E01', 'S58E02', 'S58E03', 'S58E04', 'S58E05', 'S58E06', 'S58E07', 'S58E08', 'S58E09', 'S58E10', 'S58E11', 'S58E12', 'S58E13', 'S58E14', 'S58E15'
	],

	rails: [
		['S55E01', 'S55E02', 'S55E03', 'S55E04', 'S55E05', 'S55E06', 'S55E07', 'S55E08', 'S55E09', 'S55E10', 'S55E11', 'S55E12', 'S55E13', 'S55E14', 'S55E15'],
		['S56E01', 'S56E02', 'S56E03', 'S56E04', 'S56E05', 'S56E06', 'S56E07', 'S56E08', 'S56E09', 'S56E10', 'S56E11', 'S56E12', 'S56E13', 'S56E14', 'S56E15'],
		['S57E01', 'S57E02', 'S57E03', 'S57E04', 'S57E05', 'S57E06', 'S57E07', 'S57E08', 'S57E09', 'S57E10', 'S57E11', 'S57E12', 'S57E13', 'S57E14', 'S57E15'],
		['S58E01', 'S58E02', 'S58E03', 'S58E04', 'S58E05', 'S58E06', 'S58E07', 'S58E08', 'S58E09', 'S58E10', 'S58E11', 'S58E12', 'S58E13', 'S58E14', 'S58E15']
	],

	DELIVERY_STATUS : {
		IN_PROGRESS: 0,
		COMPLETED: 1,
	},



	ADMIN_PASSWORD: 'admin%k1',

	reports: ['transfer', 'inspection', 'seal', 'offload', 'mesure'],


	SEAL_POSITIONS:  [

		// Seal1 track 55 and 56
		'55-01-01', '56-01-01',
		'55-02-01', '56-02-01',
		'55-03-01', '56-03-01',
		'55-04-01', '56-04-01',
		'55-05-01', '56-05-01',
		'55-06-01', '56-06-01',
		'55-07-01', '56-07-01',
		'55-08-01', '56-08-01',
		'55-09-01', '56-09-01',
		'55-10-01', '56-10-01',
		'55-11-01', '56-11-01',
		'55-12-01', '56-12-01',
		'55-13-01', '56-13-01',
		'55-14-01', '56-14-01',
		'55-15-01', '56-15-01',
		// Seal2 track 55 and 56 
		'55-15-02', '56-15-02',
		'55-14-02', '56-14-02',
		'55-13-02', '56-13-02',
		'55-12-02', '56-12-02',
		'55-11-02', '56-11-02',
		'55-10-02', '56-10-02',
		'55-09-02', '56-09-02',
		'55-08-02', '56-08-02',
		'55-07-02', '56-07-02',
		'55-06-02', '56-06-02',
		'55-05-02', '56-05-02',
		'55-04-02', '56-04-02',
		'55-03-02', '56-03-02',
		'55-02-02', '56-02-02',
		'55-01-02', '56-01-02',


		'57-01-01', '58-01-01',
		'57-02-01', '58-02-01',
		'57-03-01', '58-03-01',
		'57-04-01', '58-04-01',
		'57-05-01', '58-05-01',
		'57-06-01', '58-06-01',
		'57-07-01', '58-07-01',
		'57-08-01', '58-08-01',
		'57-09-01', '58-09-01',
		'57-10-01', '58-10-01',
		'57-11-01', '58-11-01',
		'57-12-01', '58-12-01',
		'57-13-01', '58-13-01',
		'57-14-01', '58-14-01',
		'57-15-01', '58-15-01',

		'57-15-02', '58-15-02',
		'57-14-02', '58-14-02',
		'57-13-02', '58-13-02',
		'57-12-02', '58-12-02',
		'57-11-02', '58-11-02',
		'57-10-02', '58-10-02',
		'57-09-02', '58-09-02',
		'57-08-02', '58-08-02',
		'57-07-02', '58-07-02',
		'57-06-02', '58-06-02',
		'57-05-02', '58-05-02',
		'57-04-02', '58-04-02',
		'57-03-02', '58-03-02',
		'57-02-02', '58-02-02',
		'57-01-02', '58-01-02',
	]

}
