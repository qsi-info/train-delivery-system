/**
 * CNRailcar
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	migrate: 'safe',

  attributes: {

  	id: {
  		type: 'string',
  		primaryKey: true,
  	},

  	Railcar: {
  		type: 'string',
  	},
    
  }

};
