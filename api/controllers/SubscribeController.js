/**
 * SubscribeController
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
    
  
  delivery: function (req, res) {
    
    Delivery.find().exec(function (err, deliveries) {
      if (err) return next(err);
      Delivery.subscribe(req.socket);
      Delivery.subscribe(req.socket, deliveries);
      return res.send(200, { message: 'Delivery subscription success' });
    });
            
  },


  railcar: function (req, res) {

    Railcar.find().exec(function (err, railcars) {
      if (err) return next(err);
      Railcar.subscribe(req.socket);
      Railcar.subscribe(req.socket, railcars);
      return res.send(200, { message: 'Railcar subscription success', railcars: railcars });
    });
    
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SubscribeController)
   */
  _config: {}

  
};
