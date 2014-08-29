/**
 * RailcarInDelivery
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	migrate: 'safe',
	autoPK: true,

  attributes: {
  	
  	id: {
  		type: 'integer',
      primaryKey: true   		
  	},

    number: {
      type: 'string',
    },
  	
    delivery: {
  		type: 'string'
  	},

  	CNRailcarID: {
  		type: 'string',
  	},

  	informations: {
  		type: 'json',
  	},

  	isDefective: {
  		type: 'boolean',
  		defaultsTo: false,
  	},

  	spot: {
  		type: 'string',	
  	},

  },

};
