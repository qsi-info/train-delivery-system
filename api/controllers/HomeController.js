/**
 * HomeController
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
    
	// Home Page  
	index: function (req, res) {
		return res.view();
	},

	// Page de gestion des livraisons actives
	delivery: function (req, res) {
		Delivery.find({ status: 'active'}).sort('createdAt DESC').exec(function (err, deliveries) {
			if (err) return res.json(err);
			return res.view({ deliveries: deliveries });
		})
	},


	// This load a delivery in the station
	station: function (req, res) {
		var delivery = req.param('delivery');
		Delivery.findOneById(delivery, function (err, delivery) {
			if (err) return res.json(err);
			return res.view({ delivery: delivery });
		})
	},


	// This page is for managing the reports link to a delivery
	reports: function (req, res) {

	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to HomeController)
   */
  _config: {}

  
};
