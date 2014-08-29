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
  	var cn_id    = req.param('cn_id');
  	RailcarInDelivery.findOneByCNRailcarID(cn_id, function (err, foundRailcar) {
  		if (err) return res.json({ error: err });
  		if (foundRailcar && !foundRailcar.isDefective) return res.json({ isAlreadyUsed: true, railcar: foundRailcar });
  		if (foundRailcar && foundRailcar.isDefective) return res.json({ isDefective: true, railcar: foundRailcar });
  		return res.json({isAvailable: true});
  	})
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RailcarInDeliveryController)
   */
  _config: {}

  
};
