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
      if (err) return res.view('500', err);
      return res.view({ deliveries: deliveries });
    })
  },
  

  count: function (req, res) {
    Delivery.count(function (err, count) {
      if (err) return res.view('500', err);
      return res.json({ count: count });
    })
  },

  create: function (req, res) {
    Delivery.create({}).done(function (err, delivery) {
      if (err) return res.view('500', err);
      return res.redirect('/delivery/manage/' + delivery.id);
    });
  },

  manage: function (req, res) {
  	var id = req.param('id');
  	Delivery.findOneById(id).done(function (err, delivery) {
  		if (err) return res.view('500', err);
  		if (!delivery) return res.view('404');
	  	return res.view({ delivery: delivery });
  	})
  },

  wagonCount: function (req, res) {
    var id = req.param('id');
    Railcar.countByDelivery(id).done(function (err, count) {
      if (err) return res.view('500', err);
      return res.json({ count: count });
    });
  },


  barilCount: function (req, res) {
    var id = req.param('id');
    var query = 'SELECT SUM(NetVolBBL) as baril_count FROM ' + Railcar._tableName + ' WHERE delivery = \'' + id + '\'';
    Railcar.query(query , function (err, results) {
      if (err) return res.view('500', err);
      var baril_count = results[0].baril_count;
      if (baril_count == null) baril_count = 0;
      return res.json({ count: baril_count.toFixed(1) });
    });
  },


  archive: function (req, res) {
    var delivery = req.param('id');
    
    Delivery.findOneById(delivery, function (err, delivery) {
      if (err) return res.view('500', err);

      var archive = {};
      archive.id = delivery.id;

      ArchiveDelivery.create(archive).done(function (err, archive) {
        if (err) return res.view('500', err);

        Delivery.query("DELETE FROM " + Delivery._tableName + " WHERE id='" + delivery.id + "'", function (err, results) {
          if (err) return res.view('500', err);
        });

      });
    });

    Railcar.findByDelivery(delivery, function (err, railcars) {
      if (err) return res.view('500', err);

      _.each(railcars, function (railcar) {

        var archive = {};
        archive.delivery = railcar.delivery;
        archive.id = railcar.id;
        archive.product = railcar.product;
        archive.number = railcar.number;
        archive.seal1 = railcar.seal1;
        archive.seal2 = railcar.seal2;
        archive.seal3 = railcar.seal3;
        archive.billOfLading = railcar.billOfLading;
        archive.netVolBBL = railcar.netVolBBL;
        archive.spot = railcar.spot;
        archive.train = railcar.train;

        ArchiveRailcar.create(archive).done(function (err, archive) {
          if (err) return res.view('500', err);
          console.log(archive);
        })
      })

      Railcar.query("DELETE FROM " + Railcar._tableName + " WHERE delivery='"+ delivery +"'", function (err, results) {
        if (err) return res.view('500', err);

        return res.redirect('/delivery');

      })

    })
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DeliveryController)
   */
  _config: {}

  
};
