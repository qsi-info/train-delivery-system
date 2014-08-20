/**
 * Railcar
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName	: 'dev_CarsAtStation',
	migrate		: 'safe',
	autoPK		: false,

  attributes: {
  	id: { type: 'string', unique: true, primaryKey: true },
  	delivery: { type: 'string' },
  	spot: { type: 'string' },
  	isProcessed: { type: 'boolean', defaultsTo: false },
    number: { type: 'string' },
    train: { type: 'string' },
    seal1: { type: 'string' },
    seal2: { type: 'string' },
    seal3: { type: 'string' },
    product: { type: 'string' },
    billOfLading: { type: 'string' },
    netVolBBL: { type: 'float' },
    currentETA: { type: 'datetime' },
    color: { type: 'string' },
    Status: { type: 'string' },
    ShipDate: { type: 'datetime'},
    isDefect: { type: 'boolean'},
  },


  // toJSON: function () {
  //   var obj = this.toObject();
  //   obj.id = obj.id.toLowerCase();
  //   console.log(obj);
  //   return obj;
  // },

  beforeCreate: function (attrs, done) {
    // Add the GUID as the primary key
    attrs.id = require('guid').create().value;
    done()
  },

  // Every time a railcar is updated
  beforeUpdate: function (values, cb) {
    // console.log(values);
    // If there is no value for the delivery, that means that the railcar is being removed from the delivery
    if (values.delivery == undefined || values.delivery == '') {
      return cb();
    }
    // Try to find the delivery
    Delivery.findOneById(values.delivery, function (err, delivery) {
      if (err) return cb(err);
      if (!delivery) return cb({ message: 'delivery doesnt exist anymore '});
      return cb();
    });
  },


};

