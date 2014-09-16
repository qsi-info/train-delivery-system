/**
 * DailyReport
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	migrate: 'safe',
	tableName: 'DailyReport',

  attributes: {

  	delivery: {
  		type: 'integer'
  	},
  	
  	sample: {
  		type: 'string',
  	},

		deliveryDate: {
			type: 'datetime',
		}, 

		receiveTime:  {
			type: 'string'
		},

		railcarCount: {
			type: 'integer',
		},

		emptyRailcarCount: {
			type: 'integer',
		},

		netVolBBL: {
			type: 'float',
		},

		flowMeter: {
			type: 'float',
		},

		comments: {
			type: 'string',
		}
    
  }

};
