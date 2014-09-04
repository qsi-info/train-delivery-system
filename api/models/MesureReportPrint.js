/**
 * MesureReportPrint
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName: 'MesureReportPrint',
	migrate: 'safe',

  attributes: {
  	delivery: { type: 'integer' },
		S55E01_Railcar: { type: 'string', defaultsTo: '' },
		S55E02_Railcar: { type: 'string', defaultsTo: '' },
		S55E03_Railcar: { type: 'string', defaultsTo: '' },
		S55E04_Railcar: { type: 'string', defaultsTo: '' },
		S55E05_Railcar: { type: 'string', defaultsTo: '' },
		S55E06_Railcar: { type: 'string', defaultsTo: '' },
		S55E07_Railcar: { type: 'string', defaultsTo: '' },
		S55E08_Railcar: { type: 'string', defaultsTo: '' },
		S55E09_Railcar: { type: 'string', defaultsTo: '' },
		S55E10_Railcar: { type: 'string', defaultsTo: '' },
		S55E11_Railcar: { type: 'string', defaultsTo: '' },
		S55E12_Railcar: { type: 'string', defaultsTo: '' },
		S55E13_Railcar: { type: 'string', defaultsTo: '' },
		S55E14_Railcar: { type: 'string', defaultsTo: '' },
		S55E15_Railcar: { type: 'string', defaultsTo: '' },

		S56E01_Railcar: { type: 'string', defaultsTo: '' },
		S56E02_Railcar: { type: 'string', defaultsTo: '' },
		S56E03_Railcar: { type: 'string', defaultsTo: '' },
		S56E04_Railcar: { type: 'string', defaultsTo: '' },
		S56E05_Railcar: { type: 'string', defaultsTo: '' },
		S56E06_Railcar: { type: 'string', defaultsTo: '' },
		S56E07_Railcar: { type: 'string', defaultsTo: '' },
		S56E08_Railcar: { type: 'string', defaultsTo: '' },
		S56E09_Railcar: { type: 'string', defaultsTo: '' },
		S56E10_Railcar: { type: 'string', defaultsTo: '' },
		S56E11_Railcar: { type: 'string', defaultsTo: '' },
		S56E12_Railcar: { type: 'string', defaultsTo: '' },
		S56E13_Railcar: { type: 'string', defaultsTo: '' },
		S56E14_Railcar: { type: 'string', defaultsTo: '' },
		S56E15_Railcar: { type: 'string', defaultsTo: '' },

		S57E01_Railcar: { type: 'string', defaultsTo: '' },
		S57E02_Railcar: { type: 'string', defaultsTo: '' },
		S57E03_Railcar: { type: 'string', defaultsTo: '' },
		S57E04_Railcar: { type: 'string', defaultsTo: '' },
		S57E05_Railcar: { type: 'string', defaultsTo: '' },
		S57E06_Railcar: { type: 'string', defaultsTo: '' },
		S57E07_Railcar: { type: 'string', defaultsTo: '' },
		S57E08_Railcar: { type: 'string', defaultsTo: '' },
		S57E09_Railcar: { type: 'string', defaultsTo: '' },
		S57E10_Railcar: { type: 'string', defaultsTo: '' },
		S57E11_Railcar: { type: 'string', defaultsTo: '' },
		S57E12_Railcar: { type: 'string', defaultsTo: '' },
		S57E13_Railcar: { type: 'string', defaultsTo: '' },
		S57E14_Railcar: { type: 'string', defaultsTo: '' },
		S57E15_Railcar: { type: 'string', defaultsTo: '' },

		S58E01_Railcar: { type: 'string', defaultsTo: '' },
		S58E02_Railcar: { type: 'string', defaultsTo: '' },
		S58E03_Railcar: { type: 'string', defaultsTo: '' },
		S58E04_Railcar: { type: 'string', defaultsTo: '' },
		S58E05_Railcar: { type: 'string', defaultsTo: '' },
		S58E06_Railcar: { type: 'string', defaultsTo: '' },
		S58E07_Railcar: { type: 'string', defaultsTo: '' },
		S58E08_Railcar: { type: 'string', defaultsTo: '' },
		S58E09_Railcar: { type: 'string', defaultsTo: '' },
		S58E10_Railcar: { type: 'string', defaultsTo: '' },
		S58E11_Railcar: { type: 'string', defaultsTo: '' },
		S58E12_Railcar: { type: 'string', defaultsTo: '' },
		S58E13_Railcar: { type: 'string', defaultsTo: '' },
		S58E14_Railcar: { type: 'string', defaultsTo: '' },
		S58E15_Railcar: { type: 'string', defaultsTo: '' },


		S55E01_Operator: { type: 'string', defaultsTo: '' },
		S55E02_Operator: { type: 'string', defaultsTo: '' },
		S55E03_Operator: { type: 'string', defaultsTo: '' },
		S55E04_Operator: { type: 'string', defaultsTo: '' },
		S55E05_Operator: { type: 'string', defaultsTo: '' },
		S55E06_Operator: { type: 'string', defaultsTo: '' },
		S55E07_Operator: { type: 'string', defaultsTo: '' },
		S55E08_Operator: { type: 'string', defaultsTo: '' },
		S55E09_Operator: { type: 'string', defaultsTo: '' },
		S55E10_Operator: { type: 'string', defaultsTo: '' },
		S55E11_Operator: { type: 'string', defaultsTo: '' },
		S55E12_Operator: { type: 'string', defaultsTo: '' },
		S55E13_Operator: { type: 'string', defaultsTo: '' },
		S55E14_Operator: { type: 'string', defaultsTo: '' },
		S55E15_Operator: { type: 'string', defaultsTo: '' },

		S56E01_Operator: { type: 'string', defaultsTo: '' },
		S56E02_Operator: { type: 'string', defaultsTo: '' },
		S56E03_Operator: { type: 'string', defaultsTo: '' },
		S56E04_Operator: { type: 'string', defaultsTo: '' },
		S56E05_Operator: { type: 'string', defaultsTo: '' },
		S56E06_Operator: { type: 'string', defaultsTo: '' },
		S56E07_Operator: { type: 'string', defaultsTo: '' },
		S56E08_Operator: { type: 'string', defaultsTo: '' },
		S56E09_Operator: { type: 'string', defaultsTo: '' },
		S56E10_Operator: { type: 'string', defaultsTo: '' },
		S56E11_Operator: { type: 'string', defaultsTo: '' },
		S56E12_Operator: { type: 'string', defaultsTo: '' },
		S56E13_Operator: { type: 'string', defaultsTo: '' },
		S56E14_Operator: { type: 'string', defaultsTo: '' },
		S56E15_Operator: { type: 'string', defaultsTo: '' },

		S57E01_Operator: { type: 'string', defaultsTo: '' },
		S57E02_Operator: { type: 'string', defaultsTo: '' },
		S57E03_Operator: { type: 'string', defaultsTo: '' },
		S57E04_Operator: { type: 'string', defaultsTo: '' },
		S57E05_Operator: { type: 'string', defaultsTo: '' },
		S57E06_Operator: { type: 'string', defaultsTo: '' },
		S57E07_Operator: { type: 'string', defaultsTo: '' },
		S57E08_Operator: { type: 'string', defaultsTo: '' },
		S57E09_Operator: { type: 'string', defaultsTo: '' },
		S57E10_Operator: { type: 'string', defaultsTo: '' },
		S57E11_Operator: { type: 'string', defaultsTo: '' },
		S57E12_Operator: { type: 'string', defaultsTo: '' },
		S57E13_Operator: { type: 'string', defaultsTo: '' },
		S57E14_Operator: { type: 'string', defaultsTo: '' },
		S57E15_Operator: { type: 'string', defaultsTo: '' },

		S58E01_Operator: { type: 'string', defaultsTo: '' },
		S58E02_Operator: { type: 'string', defaultsTo: '' },
		S58E03_Operator: { type: 'string', defaultsTo: '' },
		S58E04_Operator: { type: 'string', defaultsTo: '' },
		S58E05_Operator: { type: 'string', defaultsTo: '' },
		S58E06_Operator: { type: 'string', defaultsTo: '' },
		S58E07_Operator: { type: 'string', defaultsTo: '' },
		S58E08_Operator: { type: 'string', defaultsTo: '' },
		S58E09_Operator: { type: 'string', defaultsTo: '' },
		S58E10_Operator: { type: 'string', defaultsTo: '' },
		S58E11_Operator: { type: 'string', defaultsTo: '' },
		S58E12_Operator: { type: 'string', defaultsTo: '' },
		S58E13_Operator: { type: 'string', defaultsTo: '' },
		S58E14_Operator: { type: 'string', defaultsTo: '' },
		S58E15_Operator: { type: 'string', defaultsTo: '' },
    
  }


};
