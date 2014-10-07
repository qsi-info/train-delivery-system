/**
 * CNRailcarController
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
    

  getCloseRailcars: function (req, res) {
  	CNRailcar.query("SELECT Railcar as number FROM " + CNRailcar._tableName + " WHERE CLMLocation LIKE '%PQ%' OR CLMLocation LIKE '%ON%'", function (err, railcars) {
  		if (err) return res.json({ error: err });
  		return res.json(railcars);
  	})
  },


  get: function (req, res) {
  	var number = req.param('number');
  	CNRailcar.findOneByRailcar(number, function (err, foundRailcar) {
  		if (err) return res.json({ error: err });
  		if (!foundRailcar) return res.json({ isNotFound: true});
  		return res.json(foundRailcar);
  	})
  },
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to CNRailcarController)
   */
  _config: {}

  
};
