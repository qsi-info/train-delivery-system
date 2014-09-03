/**
 * Delivery
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName	: 'Delivery',
	migrate		: 'safe',
	autoPK		: false,

  attributes: {
  	
    id: { 
      type: 'int', 
      primaryKey: true 
    },
    
    status: { 
      type: 'string', 
      enum: ['active', 'complete'],
      defaultsTo: 'active',
    },


  },


  // beforeCreate: function (attrs, done) {
  //   var uuid = require('node-uuid');
  // 	attrs.id = uuid.v1();
  // 	done()
  // },


};
