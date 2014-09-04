/**
 * TransferReportPrint
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName: 'TransferReportPrint',
	migrate: 'safe',

  attributes: {

  	delivery: { type: 'integer', unique: true, required: true },

		S55E01_Railcar: { type: 'string', defaultsTo: '' },
		S55E01_Product: { type: 'string', defaultsTo: '' },
		S55E02_Railcar: { type: 'string', defaultsTo: '' },
		S55E02_Product: { type: 'string', defaultsTo: '' },
		S55E03_Railcar: { type: 'string', defaultsTo: '' },
		S55E03_Product: { type: 'string', defaultsTo: '' },
		S55E04_Railcar: { type: 'string', defaultsTo: '' },
		S55E04_Product: { type: 'string', defaultsTo: '' },
		S55E05_Railcar: { type: 'string', defaultsTo: '' },
		S55E05_Product: { type: 'string', defaultsTo: '' },
		S55E06_Railcar: { type: 'string', defaultsTo: '' },
		S55E06_Product: { type: 'string', defaultsTo: '' },
		S55E07_Railcar: { type: 'string', defaultsTo: '' },
		S55E07_Product: { type: 'string', defaultsTo: '' },
		S55E08_Railcar: { type: 'string', defaultsTo: '' },
		S55E08_Product: { type: 'string', defaultsTo: '' },
		S55E09_Railcar: { type: 'string', defaultsTo: '' },
		S55E09_Product: { type: 'string', defaultsTo: '' },
		S55E10_Railcar: { type: 'string', defaultsTo: '' },
		S55E10_Product: { type: 'string', defaultsTo: '' },
		S55E11_Railcar: { type: 'string', defaultsTo: '' },
		S55E11_Product: { type: 'string', defaultsTo: '' },
		S55E12_Railcar: { type: 'string', defaultsTo: '' },
		S55E12_Product: { type: 'string', defaultsTo: '' },
		S55E13_Railcar: { type: 'string', defaultsTo: '' },
		S55E13_Product: { type: 'string', defaultsTo: '' },
		S55E14_Railcar: { type: 'string', defaultsTo: '' },
		S55E14_Product: { type: 'string', defaultsTo: '' },
		S55E15_Railcar: { type: 'string', defaultsTo: '' },
		S55E15_Product: { type: 'string', defaultsTo: '' },

		S56E01_Railcar: { type: 'string', defaultsTo: '' },
		S56E01_Product: { type: 'string', defaultsTo: '' },
		S56E02_Railcar: { type: 'string', defaultsTo: '' },
		S56E02_Product: { type: 'string', defaultsTo: '' },
		S56E03_Railcar: { type: 'string', defaultsTo: '' },
		S56E03_Product: { type: 'string', defaultsTo: '' },
		S56E04_Railcar: { type: 'string', defaultsTo: '' },
		S56E04_Product: { type: 'string', defaultsTo: '' },
		S56E05_Railcar: { type: 'string', defaultsTo: '' },
		S56E05_Product: { type: 'string', defaultsTo: '' },
		S56E06_Railcar: { type: 'string', defaultsTo: '' },
		S56E06_Product: { type: 'string', defaultsTo: '' },
		S56E07_Railcar: { type: 'string', defaultsTo: '' },
		S56E07_Product: { type: 'string', defaultsTo: '' },
		S56E08_Railcar: { type: 'string', defaultsTo: '' },
		S56E08_Product: { type: 'string', defaultsTo: '' },
		S56E09_Railcar: { type: 'string', defaultsTo: '' },
		S56E09_Product: { type: 'string', defaultsTo: '' },
		S56E10_Railcar: { type: 'string', defaultsTo: '' },
		S56E10_Product: { type: 'string', defaultsTo: '' },
		S56E11_Railcar: { type: 'string', defaultsTo: '' },
		S56E11_Product: { type: 'string', defaultsTo: '' },
		S56E12_Railcar: { type: 'string', defaultsTo: '' },
		S56E12_Product: { type: 'string', defaultsTo: '' },
		S56E13_Railcar: { type: 'string', defaultsTo: '' },
		S56E13_Product: { type: 'string', defaultsTo: '' },
		S56E14_Railcar: { type: 'string', defaultsTo: '' },
		S56E14_Product: { type: 'string', defaultsTo: '' },
		S56E15_Railcar: { type: 'string', defaultsTo: '' },
		S56E15_Product: { type: 'string', defaultsTo: '' },

		S57E01_Railcar: { type: 'string', defaultsTo: '' },
		S57E01_Product: { type: 'string', defaultsTo: '' },
		S57E02_Railcar: { type: 'string', defaultsTo: '' },
		S57E02_Product: { type: 'string', defaultsTo: '' },
		S57E03_Railcar: { type: 'string', defaultsTo: '' },
		S57E03_Product: { type: 'string', defaultsTo: '' },
		S57E04_Railcar: { type: 'string', defaultsTo: '' },
		S57E04_Product: { type: 'string', defaultsTo: '' },
		S57E05_Railcar: { type: 'string', defaultsTo: '' },
		S57E05_Product: { type: 'string', defaultsTo: '' },
		S57E06_Railcar: { type: 'string', defaultsTo: '' },
		S57E06_Product: { type: 'string', defaultsTo: '' },
		S57E07_Railcar: { type: 'string', defaultsTo: '' },
		S57E07_Product: { type: 'string', defaultsTo: '' },
		S57E08_Railcar: { type: 'string', defaultsTo: '' },
		S57E08_Product: { type: 'string', defaultsTo: '' },
		S57E09_Railcar: { type: 'string', defaultsTo: '' },
		S57E09_Product: { type: 'string', defaultsTo: '' },
		S57E10_Railcar: { type: 'string', defaultsTo: '' },
		S57E10_Product: { type: 'string', defaultsTo: '' },
		S57E11_Railcar: { type: 'string', defaultsTo: '' },
		S57E11_Product: { type: 'string', defaultsTo: '' },
		S57E12_Railcar: { type: 'string', defaultsTo: '' },
		S57E12_Product: { type: 'string', defaultsTo: '' },
		S57E13_Railcar: { type: 'string', defaultsTo: '' },
		S57E13_Product: { type: 'string', defaultsTo: '' },
		S57E14_Railcar: { type: 'string', defaultsTo: '' },
		S57E14_Product: { type: 'string', defaultsTo: '' },
		S57E15_Railcar: { type: 'string', defaultsTo: '' },
		S57E15_Product: { type: 'string', defaultsTo: '' },

		S58E01_Railcar: { type: 'string', defaultsTo: '' },
		S58E01_Product: { type: 'string', defaultsTo: '' },
		S58E02_Railcar: { type: 'string', defaultsTo: '' },
		S58E02_Product: { type: 'string', defaultsTo: '' },
		S58E03_Railcar: { type: 'string', defaultsTo: '' },
		S58E03_Product: { type: 'string', defaultsTo: '' },
		S58E04_Railcar: { type: 'string', defaultsTo: '' },
		S58E04_Product: { type: 'string', defaultsTo: '' },
		S58E05_Railcar: { type: 'string', defaultsTo: '' },
		S58E05_Product: { type: 'string', defaultsTo: '' },
		S58E06_Railcar: { type: 'string', defaultsTo: '' },
		S58E06_Product: { type: 'string', defaultsTo: '' },
		S58E07_Railcar: { type: 'string', defaultsTo: '' },
		S58E07_Product: { type: 'string', defaultsTo: '' },
		S58E08_Railcar: { type: 'string', defaultsTo: '' },
		S58E08_Product: { type: 'string', defaultsTo: '' },
		S58E09_Railcar: { type: 'string', defaultsTo: '' },
		S58E09_Product: { type: 'string', defaultsTo: '' },
		S58E10_Railcar: { type: 'string', defaultsTo: '' },
		S58E10_Product: { type: 'string', defaultsTo: '' },
		S58E11_Railcar: { type: 'string', defaultsTo: '' },
		S58E11_Product: { type: 'string', defaultsTo: '' },
		S58E12_Railcar: { type: 'string', defaultsTo: '' },
		S58E12_Product: { type: 'string', defaultsTo: '' },
		S58E13_Railcar: { type: 'string', defaultsTo: '' },
		S58E13_Product: { type: 'string', defaultsTo: '' },
		S58E14_Railcar: { type: 'string', defaultsTo: '' },
		S58E14_Product: { type: 'string', defaultsTo: '' },
		S58E15_Railcar: { type: 'string', defaultsTo: '' },
		S58E15_Product: { type: 'string', defaultsTo: '' },

		wagon_count: 'INTEGER',
		baril_count: 'FLOAT',
		delivery_date: 'string',
  }

};