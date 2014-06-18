(function () {

	// Global railcars container for the search purpose.
	// DO NOT USE AS VALIDATION
	var GLOBAL_UNPROCESSED_RAILCARS;

	// Get the delivery is from the url
	var delivery = window.location.href.match(/\/([^/]*)$/)[1];

	// Subscribe to the Railcar Model
	socket.get('/subscribe/railcar', function (response) { 
		console.log(response.message); 
	});

	socket.get('/subscribe/delivery/', function (response) {
		console.log(response.message);
	});



	/**
   * - RailcarController
   * this controller manage all the interaction with the socket.io
   * It only call the appropriate UI actions.
   */
	var RailcarController = {

		
		update: function (railcar) {
			// Check if the railcar is in this delivery.
			// If not return because it is irrelevant for this delivery.
			// if (railcar.delivery != delivery) return

			// If spot is empty, find the spot with the number and apply the remove transformations.
			if (railcar.spot == '') return UI.Railcar.remove(railcar);

			// Update the spot and apply the adding transformations.
			return UI.Railcar.add(railcar); 			
		},


		add: function (railcar) {
			// Get the railcar with the requested number
			socket.get('/railcar', { number: railcar.number }, function (railcars) {
				
				// If not railcar found, throw UI Exception no found
				if (railcars.length < 1) return UI.Exceptions.railcarNotFound(railcar);
				
				// Get the found railcar from array
				var foundRailcar = railcars[0];
				
				// If the railcar is in processed, throw UI Exception already used
				if (foundRailcar.isProcessed) return UI.Exceptions.railcarAlreadyUsed(foundRailcar);
				
				// Informations that need to be update
				var updateInformations = {
					isProcessed : true,
					delivery    : railcar.delivery,
					spot        : railcar.spot,
				};

				// Update the railcar with the informations 
				socket.put('/railcar/' + foundRailcar.id, updateInformations, function (railcar) {
				
					// Call UI action for finish update
					return UI.Railcar.finishAdd(railcar);

				});

			});
		},


		remove: function (railcar) {
			// Informations that need to be update
			var updateInformations = {
				isProcessed : false,
				delivery    : '',
				spot        : '',
			}

			// Update railcar informations to free to the spot.
			socket.put('/railcar/' + railcar.id, updateInformations, function (railcar) {
				
				// Call UI action for finish remove
				return UI.Railcar.finishRemove(railcar);

			});

		},


		get: function (id, cb) {
			socket.get('/railcar/' + id, function (railcar) {
				cb(railcar);
			});
		},


		getWagonCount: function (cb) {
			socket.get('/delivery/' + delivery + '/wagon-count', function (response) {
				cb(response.count);
			});		
		},

		getBarilCount: function (cb) {
			socket.get('/delivery/' + delivery + '/baril-count', function (response) {
				cb(response.count);
			})			
		},

	}



	// ----------------------
	// UI 
	// ------------------------


	var UI = {

		initialize: function () {
			UI.Railcar.getWagonCount();
			UI.Railcar.getBarilCount();			
		},

		loading: function () {
			$('body').addClass('loading');
		},

		finishLoading: function () {
			$('body').removeClass('loading');
		},

	};

	UI.Railcar = {

		add: function (railcar) {
			var $spot = $('#' + railcar.spot);
			$spot.attr('data-reference', railcar.number);
			$spot.attr('data-id', railcar.id);
			$spot.addClass('full');
			$spot.find('.railcar').html(railcar.number);
		},

		remove: function (railcar) {
			var $railcar = $("[data-reference='" + railcar.number + "']");
			$railcar.attr('data-reference', '');
			$railcar.attr('data-id', '');
			$railcar.removeClass('full');
			$railcar.find('.railcar').html('');
		},

		getForm: function (railcar) {
			$modal = $('#ModalWagonAdd');
			$modal.find('.spot-title').html(railcar.spot);
			$modal.find("[name='spot']").val(railcar.spot);
			$modal.find("[name='number']").val(railcar.number);
			$modal.modal('toggle');
			setTimeout(function () { $('#filterInput').focus();}, 500);
		},

		getRemoveForm: function (railcar) {
			console.log(railcar);
			$modal = $('#ModalWagonRemove');
			$modal.find("[name='spot']").val(railcar.spot);
			$modal.find("[name='id']").val(railcar.id);
			$modal.find('#removeRailcarNumber').html(railcar.number);
			$modal.find('#removeRailcarNetVolBBL').html(railcar.netVolBBL);
			$modal.find('#removeRailcarBillOfLading').html(railcar.billOfLading);
			$modal.find('#removeRailcarProduct').html(railcar.product);
			$modal.find('#removeRailcarSpot').html(railcar.spot);
			$modal.find('#removeRailcarDelivery').html(railcar.delivery);
			$modal.find('#removeRailcarTrain').html(railcar.train);
			$modal.find('#removeRailcarSeal1').html(railcar.seal1);
			$modal.find('#removeRailcarSeal2').html(railcar.seal2);
			$modal.find('#removeRailcarSeal3').html(railcar.seal3);
			$modal.find('#removeRailcarNetVolBBL').html(railcar.netVolBBL);
			$modal.modal('toggle');
		},

		finishAdd: function (railcar) {
			$('#ModalWagonAdd').modal('toggle');
			UI.Railcar.getWagonCount();
			UI.Railcar.getBarilCount();
		},

		finishRemove: function (railcar) {
			$('#ModalWagonRemove').modal('toggle');
			UI.Railcar.getWagonCount();
			UI.Railcar.getBarilCount();
		},

		getWagonCount: function () {
			RailcarController.getWagonCount(function (count) {
				$('#wagonCount').html(count);
			});
		},

		getBarilCount: function () {
			RailcarController.getBarilCount(function (count) {
				$('#barilCount').html(count);
			});	
		},


	};



	UI.Exceptions = {

		railcarNotFound: function (railcar) {
			window.alert('railcar not found with number: ' + railcar.number);
		},

		railcarAlreadyUsed: function (railcar) {
			window.alert("Ce wagon est deja utilisé dans la livraison\nLivraison: " + railcar.delivery + '\nSpot: ' + railcar.spot);
		}

	}

	// ---------------------------
	// UI initialization
	// ---------------------------
	UI.initialize();








	UI.loading();
	// Get all the railcars from that delivery
	socket.get('/railcar', { delivery: delivery }, function (railcars) {
		$.each(railcars, function (i, railcar) {
			UI.Railcar.add(railcar);
		});
		UI.finishLoading();
	});


	// Route incomming message from the socket
	socket.on('message', function (message) {

		// Check if the message is related to a railcar
		if (message.model == 'railcar') {
			// Switch depending on the message verb
			switch(message.verb) {	
				// When verd is update, call RailcarController.update
				case 'update' : RailcarController.update(message.data); break;
				// Default
				default: break;
			}
			return;
		}

		// Check if the message is related to the deliveries.
		if (message.model == 'delivery') {
			switch(message.verb) {
				// If the delivery is delete while somebody is managing it, 
				// Redirect user to deliveries index page.
				case 'destroy' : if (message.id == delivery) { return window.location.href = '/delivery/'; } break;
				default: break;
			}
		}


	});










	//---------------------------------------
	// INITIALIZATION OF THE EVENTS HANDLERS
	//---------------------------------------

	// Wagon.Click
	$('.wagon').on('click', function (e) {
		e.preventDefault();

		var railcar = {
			number : $(this).attr('data-reference'),
			id     : $(this).attr('data-id'),
			spot   : $(this).attr('id'),
		};

		// If there is no railcar in the selected spot, get the railcar form
		if (railcar.number == '')  return UI.Railcar.getForm(railcar);

		// Get the remove form
		 RailcarController.get(railcar.id, function (railcar) {
		 	return UI.Railcar.getRemoveForm(railcar);
		});
	});


	// AddRailcarForm.Submit
	$('#RailcarFormAdd').on('submit', function (e) {
		e.preventDefault();

		var railcar = {
			number: $(this).find("[name='number']").val(),
			delivery: delivery,
			spot: $(this).find("[name='spot']").val(),
		}

		return RailcarController.add(railcar);
	
	});

	// RemoveRailcarForm.Submit
	$('#RailcarFormRemove').on('submit', function (e) {
		e.preventDefault();

		var railcar = {
			id: $(this).find("[name='id']").val(),
		};

		return RailcarController.remove(railcar);
	})


	$('.report-transfersheet').on('click', function (e) {
		e.preventDefault();
		socket.get($(this).attr('href'), function (response) {
			var url = 'http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=%2fTransferSheet';
			Utils.popupWindow(url, 1200, 800);
			$('#printModal').modal('toggle');
		})
	})


	$('.report-inspectionsheet').on('click', function (e) {
		e.preventDefault();
		socket.get($(this).attr('href'), function (response) {
			var url = 'http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=%2fInspectionSheets';
			Utils.popupWindow(url, 1200, 800);
			$('#printModal').modal('toggle');
		})
	})


	$('.report-sealsheet-link').on('click', function (e) {
		e.preventDefault();
		var firstSeal = window.prompt('Entrez le premier numero de seal', '4989501');
		socket.get($(this).attr('href') + '/' + firstSeal, function (response) {
			var url = 'http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=%2fSealSheet';
			Utils.popupWindow(url, 1200, 800);
			$('#printModal').modal('toggle');
		})
	});

	// -----------------------
	// TypeAheadh plugin 
	// -----------------------

	// When the ModalWagonAdd is trigger, get all unprocessed railcars
	$('#ModalWagonAdd').on('show.bs.modal', function () {
		socket.get('/railcar', { isProcessed: false },  function (railcars) {
			GLOBAL_UNPROCESSED_RAILCARS = railcars;
		});
	});


	// Typeahead plugin setup
	var typeaheadOptions = { hint: false, highlight: true, minLength: 1 };
	var typeaheadDataset = { name: 'cars', displayKey: 'value', source: railcarMatcher() };
	$('#filterInput').typeahead(typeaheadOptions, typeaheadDataset);

	/**
	 * railcarMatcher
	 * this function is use by the typeahead plugin to filter the carsfromstation with the railcar number
	 * 
   */
	function railcarMatcher () {
		return function (q, cb) {
			var matches, substringRegex;
			matches = [];
			substringRegex = new RegExp(q, 'i');
			$.each(GLOBAL_UNPROCESSED_RAILCARS, function (i, car) {
				if (substringRegex.test(car.number)) {
					matches.push({ value: car.number });
				}
			});
			cb(matches);
		}
	}

	


	// -------------------
	// Parlsey js plugin 
	// -------------------


	// Reset the validation plugin every time the modal is close
	$('#ModalWagonAdd').on('hide.bs.modal', function () {
		$('#RailcarFormAdd').parsley().reset();
	})


	// Validator configuration
	window.ParsleyValidator.addValidator('inrailcars', function (value, requirement) {
		for(var i=0, len=GLOBAL_UNPROCESSED_RAILCARS.length; i < len; i++) {
			if (GLOBAL_UNPROCESSED_RAILCARS[i].number === value) {
				return true;
			}
		}
		return false;
	});
	// Validator add message for the railcars validation
	window.ParsleyValidator.addMessage('fr', 'inrailcars', 'Le numero du wagon doit faire partie de la liste suggeree');






})()

