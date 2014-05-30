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

	// Get all the railcars from that delivery
	socket.get('/railcar', { delivery: delivery }, function (railcars) {
		$.each(railcars, function (i, railcar) {
			UI.Railcar.add(railcar);
		});
	});


	// Route incomming message from the socket
	socket.on('message', function (message) {
		// Check if message is related to the delivery
		if (message.model != 'railcar') return;

		// Switch depending on the message verb
		switch(message.verb) {	

			// When verd is update, call RailcarController.update
			case 'update' : RailcarController.update(message.data); break;

			// Default
			default: break;

		}

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

		}

	}




	var UI = {};

	UI.Railcar = {

		add: function (railcar) {
			var $spot = $('#' + railcar.spot);
			$spot.attr('data-reference', railcar.number);
			$spot.attr('data-id', railcar.id);
			$spot.addClass('bg-success');
			$spot.find('.railcar').html(railcar.number);
		},

		remove: function (railcar) {
			console.log('asd');
			var $railcar = $("[data-reference='" + railcar.number + "']");
			$railcar.attr('data-reference', '');
			$railcar.attr('data-id', '');
			$railcar.removeClass('bg-success');
			$railcar.find('.railcar').html('');
		},

		getForm: function (railcar) {
			$modal = $('#ModalWagonAdd');
			$modal.find('.spot-title').html(railcar.spot);
			$modal.find("[name='spot']").val(railcar.spot);
			$modal.find("[name='number']").val(railcar.number);
			$modal.modal('toggle');
		},

		getRemoveForm: function (railcar) {
			$modal = $('#ModalWagonRemove');
			$modal.find("[name='spot']").val(railcar.spot);
			$modal.find("[name='id']").val(railcar.id);
			$modal.modal('toggle');
		},

		finishAdd: function (railcar) {
			$('#ModalWagonAdd').modal('toggle');
		},

		finishRemove: function (railcar) {
			$('#ModalWagonRemove').modal('toggle');
		}

	};



	UI.Exceptions = {

		railcarNotFound: function (railcar) {
			window.alert('railcar not found with number: ' + railcar.number);
		},

		railcarAlreadyUsed: function (railcar) {
			window.alert('railcar is already used in delivery: ' + railcar.delivery + ' a the spot: ' + railcar.spot);
		}

	}


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
		return UI.Railcar.getRemoveForm(railcar);

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


	$('#RailcarFormRemove').on('submit', function (e) {
		e.preventDefault();

		var railcar = {
			id: $(this).find("[name='id']").val(),
		};

		return RailcarController.remove(railcar);
	})




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



})()

