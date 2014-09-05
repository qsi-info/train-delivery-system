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
	// autoPK		: false,

  attributes: {
  	
    // id: { 
    //   type: 'integer', 
    //   primaryKey: true 
    // },
    
    status: { 
      type: 'string', 
      enum: ['active', 'complete'],
      defaultsTo: 'active',
    },


  },



  beforeDestroy: function (attrs, done) {
    var delivery = attrs.where.id;
    RailcarInDelivery.query("DELETE FROM " + RailcarInDelivery._tableName + " WHERE delivery=" + delivery, function (err) {if (err) return console.log(err);});
    TransferReport.query("DELETE FROM " + TransferReport._tableName + " WHERE delivery=" + delivery, function (err) {if (err) return console.log(err);});
    InspectionReport.query("DELETE FROM " + InspectionReport._tableName + " WHERE delivery=" + delivery, function (err) {if (err) return console.log(err);});
    SealReport.query("DELETE FROM " + SealReport._tableName + " WHERE delivery=" + delivery, function (err) {if (err) return console.log(err);});
    OffloadReport.query("DELETE FROM " + OffloadReport._tableName + " WHERE delivery=" + delivery, function (err) {if (err) return console.log(err);});
    MesureReport.query("DELETE FROM " + MesureReport._tableName + " WHERE delivery=" + delivery, function (err) {if (err) return console.log(err);});
    done();
  },

  // beforeCreate: function (attrs, done) {
  //   var uuid = require('node-uuid');
  // 	attrs.id = uuid.v1();
  // 	done()
  // },


};
