/**
 * SearchController
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
    
  
	railcar: function (req, res) {
		var number = req.param('number');
		RailcarInDelivery.query("SELECT delivery, status, number, spot FROM railcarindelivery INNER JOIN delivery ON delivery.id = railcarindelivery.delivery WHERE railcarindelivery.number LIKE'%" + number + "%' ORDER BY delivery.status ASC", function (err, results) {
			if (err) return res.json(err);
			return res.json(results);
		})
	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SearchController)
   */
  _config: {}

  
};
