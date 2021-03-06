/**
 * PrintController
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
    
  
  transfer: function (req, res) {
  	var delivery = req.param('delivery');

  	TransferReport.findOneByDelivery(delivery, function (err, report) {
  		if (err) return res.json({ error: err });
  		if (!report) return res.view('404');

  		TransferReportPrint.query('DELETE FROM ' + TransferReportPrint._tableName + ' WHERE id=1', function (err) {
	  		if (err) return res.json({ error: err });
	  		var printReport = report;

	  		printReport.id = 1;

	  		TransferReportPrint.create(printReport).done(function (err, report) {
		  		if (err) return res.json({ error: err });

		  		// return res.json({ status: 'ok' });
		  		return res.json({ url: 'http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=/TrainDeliverySystem/TransferReport' });
		  		// return res.redirect('http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=/TrainDeliverySystem/TransferReport');

	  		})
  		});
  	});
  },


  inspection: function (req, res) {
  	var delivery = req.param('delivery');

  	InspectionReport.findByDelivery(delivery, function (err, railcars) {
			if (err) return res.json({ error: err });


			InspectionReportPrint.query("DELETE FROM " + InspectionReportPrint._tableName, function (err) {
				if (err) return res.json({ error: err });

	 			_.each(railcars, function (railcar) {
	 				InspectionReportPrint.create(railcar).done(function (err) {
	  				if (err) return res.json({ error: err });
	 				});
	 			});

	 			return res.json({ url: 'http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=/TrainDeliverySystem/InspectionReport' });
				// return res.redirect('http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=/TrainDeliverySystem/InspectionReport');

			});		
  	});
  },



  seal: function (req, res) {
  	var delivery = req.param('delivery');
  	SealReport.findOneByDelivery(delivery, function (err, report) {
			if (err) return res.json({ error: err });
			
			SealReportPrint.query("DELETE FROM " + SealReportPrint._tableName + " WHERE id=1", function (err) {
				if (err) return res.json({ error: err });

				var sealPrint = report;
				sealPrint.id = 1;

				SealReportPrint.create(sealPrint).done(function (err, report) {
					if (err) return res.json({ error: err });

					return res.json({ url: 'http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=/TrainDeliverySystem/SealReport' });
					// return res.redirect('http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=/TrainDeliverySystem/SealReport')

				});
			});
  	});
  },



  offload: function (req, res) {
  	var delivery = req.param('delivery');
  	OffloadReport.findByDelivery(delivery, function (err, railcars) {
  		if (err) return res.json({ error: err });

  		OffloadReportPrint.query("DELETE FROM " + OffloadReportPrint._tableName, function (err) {
  			if (err) return res.json({ error: err });

  			_.each(railcars, function (railcar) {
  				OffloadReportPrint.create(railcar).done(function (err, car) {
  					if (err) return res.json({ error: err });
  				});
  			});
  			return res.json({ url: 'http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=/TrainDeliverySystem/OffloadReport' })
  		})
  	})
  },



  mesure: function (req, res) {
    var delivery = req.param('delivery');
    MesureReport.findOneByDelivery(delivery, function (err, report) {
      if (err) return res.json({ error: err });
      
      MesureReportPrint.query("DELETE FROM " + MesureReportPrint._tableName + " WHERE id=1", function (err) {
        if (err) return res.json({ error: err });
        
        var printReport = report;
        printReport.id = 1;

        MesureReportPrint.create(printReport).done(function (err, report) {
          if (err) return res.json({ error: err });
          console.log(report);
          return res.json({ url: 'http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=/TrainDeliverySystem/MesureReport' })
        });
      });
    });
  },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PrintController)
   */
  _config: {}

  
};
