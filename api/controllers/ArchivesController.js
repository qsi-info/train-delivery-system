/**
 * ArchiveController
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
    
  index: function (req, res) {
  	return res.view();
  },
  
	delivery: function (req, res) {
		ArchiveDelivery.find().sort('createdAt DESC').exec(function (err, deliveries) {
			if (err) return res.view('500', err);
			return res.view({ deliveries: deliveries });
		});
	},

	showDelivery: function (req, res) {
		var delivery = req.param('id');
		ArchiveRailcar.findByDelivery(delivery, function (err, railcars) {
			if (err) return res.view('500', err);
			return res.view({ railcars: railcars, delivery: delivery });
		})
	},

	restoreRailcar: function (req, res) {
		var railcar = req.param('id');
		ArchiveRailcar.findOne(railcar).done(function (err, archiveRailcar) {
			if (err) return res.view('500', err);
			var delivery = archiveRailcar.delivery;
			var archiveRailcarId = archiveRailcar.id;
			archiveRailcar.spot = '';
			archiveRailcar.delivery = '';
			Railcar.create(archiveRailcar).done(function (err, railcar) {
				if (err) return res.view('500', err);
				ArchiveRailcar.destroy({ id: archiveRailcarId}).done(function (err) {
					if (err) return res.view('500', err);
					return res.redirect('/archives/delivery/' + delivery);
				})
			})
		})
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ArchiveController)
   */
  _config: {}

  
};
