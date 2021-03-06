/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */



/**
 * (1) Core middleware
 *
 * Middleware included with `app.use` is run first, before the router
 */


/**
 * (2) Static routes
 *
 * This object routes static URLs to handler functions--
 * In most cases, these functions are actions inside of your controllers.
 * For convenience, you can also connect routes directly to views or external URLs.
 *
 */

module.exports.routes = {

  '/' : 'HomeController.index',
  '/delivery' : 'HomeController.delivery',
  '/delivery/create' : 'HomeController.createDelivery',

  '/delivery/station/:delivery' : 'HomeController.station',
  '/delivery/reports/:delivery' : 'HomeController.reports',
  '/delivery/tasks/:delivery' : 'HomeController.tasks',

  'post /delivery/archive' : 'DeliveryController.archive',

  '/delivery/reports/transfer/:delivery' : 'ReportController.transfer',
  '/delivery/reports/inspection/:delivery' : 'ReportController.inspection',
  'post /delivery/reports/seal/:delivery' : 'ReportController.seal',
  'post /delivery/reports/offload/:delivery' : 'ReportController.offload',
  'post /delivery/reports/mesure/:delivery' : 'ReportController.mesure',



  '/delivery/reports/print/transfer' : 'PrintController.transfer',
  '/delivery/reports/print/inspection' : 'PrintController.inspection',
  '/delivery/reports/print/seal' : 'PrintController.seal',
  '/delivery/reports/print/offload' : 'PrintController.offload',
  '/delivery/reports/print/mesure' : 'PrintController.mesure',




  'post /delivery/tasks/transfer/complete' : 'TaskController.transfer',
  '/delivery/tasks/transfer/iscomplete' : 'TaskController.transferIsComplete',

  'post /delivery/tasks/inspection/complete' : 'TaskController.inspection',
  '/delivery/tasks/inspection/iscomplete' : 'TaskController.inspectionIsComplete',

  'post /delivery/tasks/seal/complete' : 'TaskController.seal',
  '/delivery/tasks/seal/iscomplete' : 'TaskController.sealIsComplete',

  'post /delivery/tasks/offload/complete' : 'TaskController.offload',
  '/delivery/tasks/offload/iscomplete' : 'TaskController.offloadIsComplete',

  'post /delivery/tasks/mesure/complete' : 'TaskController.mesure',
  '/delivery/tasks/mesure/iscomplete' : 'TaskController.mesureIsComplete',

  'post /delivery/tasks/daily/complete' : 'TaskController.daily',
  '/delivery/tasks/daily/iscomplete' : 'TaskController.dailyIsComplete',




  '/archives' : 'HomeController.archives',

  '/help' : 'HomeController.help',

  '/admin' : 'HomeController.admin',

  '/search' : 'HomeController.search',

  'post /admin/query' : 'AdminController.query',

  '/switchlang' : 'HomeController.switchLang',

  '/test' : 'HomeController.test',


  'post /admin/login' : 'HomeController.adminLogin',

  // '/delivery'

  // '/' : 'MainController.index',
  // '/help' : "MainController.help",

  // '/delivery/create' : 'DeliveryController.create',
  // '/delivery/:id/wagon-count' : 'DeliveryController.wagonCount',
  // '/delivery/:id/baril-count' : 'DeliveryController.barilCount',

  // '/archivedelivery/:id/wagon-count' : 'ArchiveDeliveryController.wagonCount',

  // '/archives/delivery/:id' : 'ArchivesController.showDelivery',

  // '/archives/railcar/restore/:id' : 'ArchivesController.restoreRailcar',

  // '/report/sealsheet/:delivery/:seal' : 'ReportController.sealSheet',

  // '/admin/login' : 'MainController.adminLogin',

  // '/admin' : 'MainController.admin',

  // 'post /admin/query' : 'AdminController.query',

};



/** 
 * (3) Action blueprints
 * These routes can be disabled by setting (in `config/controllers.js`):
 * `module.exports.controllers.blueprints.actions = false`
 *
 * All of your controllers ' actions are automatically bound to a route.  For example:
 *   + If you have a controller, `FooController`:
 *     + its action `bar` is accessible at `/foo/bar`
 *     + its action `index` is accessible at `/foo/index`, and also `/foo`
 */


/**
 * (4) Shortcut CRUD blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *			`module.exports.controllers.blueprints.shortcuts = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *		/foo/find/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		/foo/create		->	create a lampshade using specified values
 *
 *		/foo/update/:id	->	update the lampshade with id=:id
 *
 *		/foo/destroy/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (5) REST blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *		`module.exports.controllers.blueprints.rest = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *
 *		get /foo/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		post /foo		-> create a lampshade using specified values
 *
 *		put /foo/:id	->	update the lampshade with id=:id
 *
 *		delete /foo/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (6) Static assets
 *
 * Flat files in your `assets` directory- (these are sometimes referred to as 'public')
 * If you have an image file at `/assets/images/foo.jpg`, it will be made available
 * automatically via the route:  `/images/foo.jpg`
 *
 */



/**
 * (7) 404 (not found) handler
 *
 * Finally, if nothing else matched, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 */
 
