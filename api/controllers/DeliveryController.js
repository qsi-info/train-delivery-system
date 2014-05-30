/**
 * DeliveryController
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
    Delivery.find().exec(function (err, deliveries) {
      if (err) return next(err);
      return res.view({ deliveries: deliveries });
    })
  },
  
  manage: function (req, res) {
  	var id = req.param('id');
  	Delivery.findOneById(id).done(function (err, delivery) {
  		if (err) return next(err);
  		if (!delivery) return res.view('404');
	  	return res.view({ delivery: delivery });
  	})
  },

  wagonCount: function (req, res) {
    var id = req.param('id');
    Railcar.countByDelivery(id).done(function (err, count) {
      if (err) return next(err);
      console.log(count);
      return res.json({ count: count });
    });
  },


  barilCount: function (req, res) {
    var id = req.param('id');
    var query = 'SELECT SUM(NetVolBBL) as baril_count FROM ' + Railcar._tableName + ' WHERE delivery = \'' + id + '\'';
    Railcar.query(query , function (err, results) {
      if (err) return next(err);
      var baril_count = results[0].baril_count;
      if (baril_count == null) baril_count = 0;
      return res.json({ count: baril_count.toFixed(1) });
    });
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DeliveryController)
   */
  _config: {}

  
};
