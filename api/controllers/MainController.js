/**
 * MainController
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

  	help: function (req, res) {
  		return res.view();
  	},

    adminLogin: function (req, res) {
      var password = req.param('password');
      if (password == 'qualitech') {
        return res.send({ status: 200 });
      }
      else {
        return res.send({ status: 403 });
      }
    },


    admin: function (req, res) {
      return res.view();
    },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MainController)
   */
  _config: {}

  
};
