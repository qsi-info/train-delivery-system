/**
 * ReportController
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
    
  
  transfersheet: function (req, res) {
  	var delivery = req.param('id');

  	Railcar.findByDelivery(delivery, function (err, railcars) {
  		if (err) return res.view('500', err);

 			// Car mapping for buiding report
 			var acc = {};
 			var wagon_count = railcars.length;
 			var baril_count = 0;
 			_.each(railcars, function (car) {
 				acc[car.spot+'_Railcar'] = car.number;
 				acc[car.spot+'_Product'] = car.product;
 				baril_count += car.netVolBBL;
 			});
 			acc.id = 1;
 			acc.wagon_count = wagon_count;
 			acc.baril_count = baril_count;
 			acc.delivery_date = Utils.todayDate();



			// Delete every lines in reports 			
 			ReportTransferSheet.query('DELETE FROM ReportTransferSheet', function (err) {
 				if (err) return res.view('500', err);
 				// Create the line with all the informations for the transfer report
 				ReportTransferSheet.create(acc).done(function (err, report) {
 					if (err) return res.view('500', err);
 					return res.redirect('http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=%2fTransferSheet');
 				});
 			});

  	});

  },



  inspectionSheet: function (req, res) {
    var delivery = req.param('id');

    ReportInspectionSheet.query('DELETE FROM ReportInspectionSheet', function (err) {
      if (err) return res.view('500', err);

      Railcar.findByDelivery(delivery, function (err, railcars) {
        if (err) return res.view('500', err);

        _.each(railcars, function (railcar) {

          var inspectionRailcar = {};
          inspectionRailcar.id = railcar.id;
          inspectionRailcar.product = railcar.product;
          inspectionRailcar.number = railcar.number;
          inspectionRailcar.seal1 = railcar.seal1;
          inspectionRailcar.seal2 = railcar.seal2;
          inspectionRailcar.seal3 = railcar.seal3;
          inspectionRailcar.billOfLading = railcar.billOfLading;
          inspectionRailcar.netVolBBL = railcar.netVolBBL;
          inspectionRailcar.spot = railcar.spot;
          inspectionRailcar.train = railcar.train;


          ReportInspectionSheet.create(inspectionRailcar).done(function (err, inspection) {
            if (err) return res.view('500', err);
          });

        });

        return res.redirect('http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=%2fInspectionSheets');

      });

    });

  },


  sealSheet: function (req, res) {
    
    var delivery = req.param('delivery');
    var sealCounter = req.param('seal');

    Railcar.findByDelivery(delivery, function (err, railcars) {
      if (err) return res.view('500', err);

      var sealSheet = {};

      _.each(railcars, function (railcar) {
        sealSheet[railcar.spot+'_'+'Railcar'] = railcar.number;
      });

      _.each(sails.config.k1.SEAL_POSITIONS, function (position) {
        var references = position.split('-');
        var track = references[0];
        var spot = references[1];
        var seal = references[2];

        var spotString = 'S'+track+'E'+spot;

        var railcar = findRailcarBySpot(railcars, spotString);

        if (railcar) {
          sealSheet[spotString+'_'+seal] = sealCounter++; 
        }

      });
      ReportSealSheet.query("DELETE FROM " + ReportSealSheet._tableName, function (err) {
        if (err) return console.log(err);

        ReportSealSheet.create(sealSheet).done(function (err, report) {
          if (err) return console.log(err);
          return res.redirect('http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=%2fSealSheet');
        });

      });


    });

    var findRailcarBySpot = function (railcars, spot) {
      for (var i=0, len=railcars.length; i < len; i++) {
        if (railcars[i].spot == spot) {
          return railcars[i];
        }
      }
      return false;
    }  


  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ReportController)
   */
  _config: {}

  
};
