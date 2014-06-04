/**
 * ReportInspectionSheet
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName: 'ReportInspectionSheet',
	migrate: 'safe',
  autoPK: false,

  attributes: {
  	id: { type: 'string' },
  	spot: { type: 'string' },
    number: { type: 'string' },
    train: { type: 'string' },
    seal1: { type: 'string' },
    seal2: { type: 'string' },
    seal3: { type: 'string' },
    product: { type: 'string' },
    billOfLading: { type: 'string' },
    netVolBBL: { type: 'float' },
  }

};
