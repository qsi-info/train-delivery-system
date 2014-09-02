/**
 * RailcarInDeliveryController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  isAlreadyUsed: function (req, res) {
  	var cn_id = req.param('cn_id');
  	RailcarInDelivery.findOneByCNRailcarID(cn_id, function (err, foundRailcar) {
  		if (err) return res.json({ error: err });
  		if (foundRailcar && !foundRailcar.isDefective) return res.json({ isAlreadyUsed: true, railcar: foundRailcar });
  		if (foundRailcar && foundRailcar.isDefective) return res.json({ isDefective: true, isAvailable: true, railcar: foundRailcar });
  		return res.json({isAvailable: true});
  	})
  },


  railcarsFromDelivery: function (req, res) {
    var delivery = req.param('delivery');
    RailcarInDelivery.query("SELECT number, spot, id, isDefective FROM " + RailcarInDelivery._tableName + " WHERE delivery='" + delivery + "'", function (err, railcars) {
      if (err) return res.json({ error: err });
      return res.json(railcars);
    });
  },


  updateNetVolBBL: function (req, res) {
    var id = req.param('id');
    var netVolBBL = req.param('netVolBBL');
    RailcarInDelivery.update({ id: id }, { netVolBBL: netVolBBL }, function (err, updatedRailcars) {
      if (err) return res.json({ error: err });
      if (updatedRailcars.length < 1) return res.json({ error: 'not found' });
      var updatedRailcar = updatedRailcars[0];
      RailcarInDelivery.publishUpdate(updatedRailcar.id, { netVolBBL: netVolBBL, delivery: updatedRailcar.delivery }); 
      return res.json({ status: 'OK'});

    });
  },


  updateStatus: function (req, res) {
    var railcar = req.param('railcar');
    var status = req.param('status');
    RailcarInDelivery.update({ id: railcar }, { isDefective: status }, function (err, updatedRailcars) {
      if (err) return res.json({ error: err });
      if (updatedRailcars.length < 1) return res.json({ error: 'not found' });
      var updatedRailcar = updatedRailcars[0];
      RailcarInDelivery.publishUpdate(updatedRailcar.id, { isDefective: updatedRailcar.isDefective, delivery: updatedRailcar.delivery, spot: updatedRailcar.spot }); 
      return res.json({ status: 'OK'});

    })
  },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RailcarInDeliveryController)
   */
  _config: {}

  
};
