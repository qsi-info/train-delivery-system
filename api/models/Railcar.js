/**
 * Railcar
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName	: 'dev_Railcar',
	migrate		: 'safe',
	autoPK		: false,

  attributes: {
  	id: { type: 'string', unique: true, primaryKey: true },
  	delivery: { type: 'string' },
  	spot: { type: 'string' },
  	isProcessed: { type: 'boolean', defaultsTo: false },
  },


  toJSON: function () {
    var obj = this.toObject();
    obj.id = obj.id.toLowerCase();
    console.log(obj);
    return obj;
  },

  beforeCreate: function (attrs, done) {
    // Add the GUID as the primary key
    attrs.id = require('guid').create().value;
    done()
  },


};

