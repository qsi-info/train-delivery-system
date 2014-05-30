/**
 * Delivery
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName	: 'dev_Delivery',
	migrate		: 'safe',
	autoPK		: false,

  attributes: {
  	id: { type: 'string', unique: true, primaryKey: true },
  	status: { type: 'integer', defaultsTo: 0 },
  },


  beforeCreate: function (attrs, done) {
  	// Add the GUID as the primary key
  	attrs.id = require('guid').create().value;
  	done()
  },

};
