/**
 * ReportEndDay
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName: 'ReportEndDay',
	migrate: 'safe',
  autoPK: false,
  
  attributes: {
   	id: { type: 'string' },
    number: { type: 'string' },
    product: { type: 'string' },
    billOfLading: { type: 'string' },
    destination: { type: 'string' },
    netVolBBL: { type: 'float' }, 	
    
  }

};
