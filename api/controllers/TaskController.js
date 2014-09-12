/**
 * TaskController
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

    Delivery.findOneById(delivery, function (err, delivery) {
      if (err) return res.json({ error: err });
      if (!delivery) return res.view('404');

      RailcarInDelivery.findByDelivery(delivery.id, function (err, railcars) {
        if (err) return res.json({ error: err });

       // Car mapping for buiding report
        var acc = {};
        var wagon_count = railcars.length;
        var baril_count = 0;
        _.each(railcars, function (car) {
          var informations = Utils.JSONFixParse(car.informations);
          acc[car.spot+'_Railcar'] = car.number;
          acc[car.spot+'_Product'] = informations.Product;
          baril_count += car.netVolBBL;
        });
        acc.wagon_count = wagon_count;
        acc.baril_count = baril_count;
        acc.delivery_date = Utils.todayDate();
        acc.delivery = delivery.id;

        TransferReport.query("DELETE FROM " + TransferReport._tableName + " WHERE delivery='" + delivery.id + "'", function (err) {
          if (err) return res.json({ error: err });
          
          TransferReport.create(acc).done(function (err, report) {
            if (err) return res.json({ error: err });

            return res.json({ done: true });

          });       
        });
      });
    });
  },  


  transferIsComplete: function (req, res) {
    var delivery = req.param('delivery');
    TransferReport.findOneByDelivery(delivery, function (err, report) {
      if (err) return res.json({ error: err });
      if (!report) return res.json({ isComplete: false});
      return res.json({ isComplete: true });
    });
  },











  inspection: function (req, res) {
    var delivery = req.param('delivery');


    Delivery.findOneById(delivery, function (err, delivery) {
      if (err) return res.json({ error: err });
      if (!delivery) return res.view('404');


      InspectionReport.query("DELETE FROM " + InspectionReport._tableName + " WHERE delivery='" + delivery.id + "'", function (err) {
        if (err) return res.json({ error: err });

        RailcarInDelivery.findByDelivery(delivery.id, function (err, railcars) {
          if (err) return res.json({ error: err });

          _.each(railcars, function (railcar) {
            var informations = Utils.JSONFixParse(railcar.informations);
            var inspectionRailcar = {};
            inspectionRailcar.product = informations.Product;
            inspectionRailcar.number = railcar.number;
            inspectionRailcar.seal1 = informations.Seal1;
            inspectionRailcar.seal2 = informations.Seal2;
            inspectionRailcar.seal3 = informations.Seal3;
            inspectionRailcar.billOfLading = informations.BillofLading;
            inspectionRailcar.netVolBBL = railcar.netVolBBL;
            inspectionRailcar.spot = railcar.spot;
            inspectionRailcar.train = informations.TrainId;
            inspectionRailcar.delivery = delivery.id;

            InspectionReport.create(inspectionRailcar).done(function (err, doneRailcar) {
              if (err) return res.json({ error: err });
            });
          });

          return res.json({ done: true });

        });
      });
    });


  },




  inspectionIsComplete: function (req, res) {
    var delivery = req.param('delivery');
    InspectionReport.countByDelivery(delivery, function (err, count) {
      if (err) return res.json({ error: err });
      if (count < 1) return res.json({ isComplete: false });
      return res.json({ isComplete: true });
    });
  },









  seal: function (req, res) {
    var delivery = req.param('delivery');
    var sealCounter = req.param('seal');

    SealReport.query("DELETE FROM " + SealReport._tableName + " WHERE delivery=" + delivery, function (err) {
      if (err) return res.json({ error: err });


      RailcarInDelivery.findByDelivery(delivery, function (err, railcars) {
        if (err) return res.json({ error: err });

        var sealSheet = {};
        sealSheet.delivery = delivery;

        _.each(railcars, function (railcar) {
          sealSheet[railcar.spot+'_'+'Railcar'] = railcar.number;
        });

        _.each(sails.config.TrainSystem.SEAL_POSITIONS, function (position) {
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

        SealReport.create(sealSheet).done(function (err, report) {
          if (err) return res.json({ error: err });
          return res.redirect('/delivery/tasks/' + delivery);

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


  sealIsComplete: function (req, res) {
    var delivery = req.param('delivery');
    SealReport.findOneByDelivery(delivery, function (err, report) {
      if (err) return res.json({ error: err });
      if (!report) return res.json({ isComplete: false});
      return res.json({ isComplete: true });            
    });
  },












  offload: function (req, res) {
    var delivery = req.param('delivery');
    var operator = req.param('operator');

    OffloadReport.query("DELETE FROM " + OffloadReport._tableName + " WHERE delivery=" + delivery, function (err) {
      if (err) return res.json({ error: err });
      
      RailcarInDelivery.findByDelivery(delivery, function (err, railcars) {
        if (err) return res.json({ error: err });

        _.each(railcars, function (railcar) {

          var informations = Utils.JSONFixParse(railcar.informations);



          var offloadRailcar = {
            delivery         : railcar.delivery,
            number           : railcar.number,
            product          : informations.Product,
            billOfLading     : informations.BillofLading,
            netVolBBL        : railcar.netVolBBL,
            currentETA       : informations.CurrentETA,
            origin           : informations.RtOrigin,
            netVolLTR        : informations.NetVolLtr,
            destination      : informations.RtDestination,
            destinationState : informations.DeSt,
            originState      : informations.OrSt,
            CLM              : informations.CLM,
            CLMLocation      : informations.CLMLocation,
            record           : railcar.id,
            // adjustedVol      : 
            // offloadSTPNetVol : 
            // carrier          : 
            // orderNo          : 
            entryType        : 'ORIG',
            offloadStatus    : railcar.isDefective ? 'N' : 'Y', 
            operator         : operator,
            // sourceFileData   : 
            shipDate         : informations.ShipDate,
          }


          OffloadReport.create(offloadRailcar, function (err, entry) {
            if (err) return res.json({ error: err });          
          })
        })
        
        return res.redirect('/delivery/tasks/' + delivery);
    
      });
    });
  },



  offloadIsComplete: function (req, res) {
    var delivery = req.param('delivery');
    OffloadReport.countByDelivery(delivery, function (err, count) {
      if (err) return res.json({ error: err });
      if (count < 1) return res.json({ isComplete: false });
      return res.json({ isComplete: true });
    });
  },






  mesure: function (req, res) {
    var delivery = req.param('delivery');
    MesureReport.query("DELETE FROM " + MesureReport._tableName + " WHERE delivery=" + delivery, function (err) {
      if (err) return res.json({ error: err });

      var report = req.body;

      MesureReport.create(report).done(function (err, doneReport) {
        if (err) return res.json({ error: err });
        return res.redirect('/delivery/tasks/' + delivery);
      });
    });
  },




  mesureIsComplete: function (req, res) {
    var delivery = req.param('delivery');
    MesureReport.findOneByDelivery(delivery, function (err, report) {
      if (err) return res.json({ error: err });
      if (!report) return res.json({ isComplete: false});
      return res.json({ isComplete: true });            
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to TaskController)
   */
  _config: {}

  
};
