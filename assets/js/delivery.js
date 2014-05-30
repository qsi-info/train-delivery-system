$(function () {
	// Globa cars array
	var GLOBAL_CARS_UNPROCESSED = [];

	var GLOBAL_CARS_FROM_DELIVERY = [];

	// Delivery id 
	var delivery_id = $('#deliveryContainer').attr('data-reference');

	// Get all cars from the delivery and show them
	socket.get('/api/carsfromdelivery', { delivery_id: delivery_id }, function (cars) {
		$.each(cars, function (i, car) {
			// UI action
			$('#' + car.spot_number).attr('data-reference', car.RailCarID).addClass('full').find('.railcar').html(car.RailCarID.substring(0, 10));		
		});

		/**
		 * .wagon .on(click)
		 * If the spot is free, get all the un-processed cars from station.
		 * Otherwise, show to modal with the wagon and with delete buttn
		 *
	   */
		$('.wagon').click(function (e) {
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			// if ($(this).attr('data-reference') == '') {
			var spot_number = $(this).attr('id');
			$self = $(this);

			socket.get('/api/carsfromdelivery', { delivery_id: delivery_id, spot_number: spot_number }, function (cars) {
				// If there is a car in the spot but no reference, refresh the page with the right informations
				if (cars.length > 0 && $self.attr('data-reference') == '') return window.location.reload();
				// If there is a reference in the spot
				if ($self.attr('data-reference') != '') {

					// UI actions
					$('#filterSpotNumber').val(spot_number);
					$('#filterInput').prop('disabled', true).val($self.find('.railcar').html());
					$('#railcarid').val($self.attr('data-reference'));
					$('#removeCarBtn').show();
					$('#addCarBtn').hide();
					$('#myModal .modal-title').html(spot_number);
					$('#myModal').modal('toggle');
					return;
				}
				// The spot is empty
				socket.get('/api/carsatstation', { isProcessed: false }, function (cars) {
					// console.log(cars);
					GLOBAL_CARS_UNPROCESSED = cars;
					// UI actions
					$('#filterSpotNumber').val(spot_number);
					$('#filterInput').val('');
					$('#filterInput').removeProp('disabled');
					$('#addCarBtn').show();
					$('#removeCarBtn').hide();
					$('#myModal .modal-title').html(spot_number);
					$('#myModal').modal('toggle');
					setTimeout(function () { $('#filterInput').focus(); }, 300);
				});										
			});
		});

	});


	// Update delivery statistics
	updateWagonCount();
	updateBarilCount();
	updateCarsFromDelivery();

	
		


	// Typeahead plugin setup
	var typeaheadOptions = { hint: false, highlight: true, minLength: 1 };
	var typeaheadDataset = { name: 'cars', displayKey: 'value', source: railcarMatcher() };
	$('#filterInput').typeahead(typeaheadOptions, typeaheadDataset);


	// Reset the validation plugin every time the modal is close
	$('#myModal').on('hide.bs.modal', function () {
		$('#railCarForm').parsley().reset();
	})





	/**
	 * #railCarForm .submit
	 * create a new car in cars from delivery with the right informations.
	 * update the view spot data-reference and railcar number
	 *
   */
	$('#railCarForm').submit(function (e) {
		e.preventDefault();
		var spot_number = $('#filterSpotNumber').val();
		var railcar = $('#filterInput').val()
		var railcarid = findCarId(railcar);
		socket.get('/api/carsfromdelivery', { delivery_id: delivery_id, spot_number: spot_number }, function (cars) {
			// If the spot is already taken int the delivery, refresh page with right informations
			if (cars.length > 0) return window.location.reload();
			socket.post('/api/carsfromdelivery', { RailCarID: railcarid, delivery_id: delivery_id, spot_number: spot_number }, function (car) {
				// UI actions
				updateWagonCount();
				updateBarilCount();
				updateCarsFromDelivery();
				$('#' + car.spot_number).attr('data-reference', car.RailCarID).addClass('full').find('.railcar').html(railcar);
				$('#myModal').modal('toggle');
			});
		});
	});


	/**
	 * #removeCarBtn .on(click)
	 * delete the car in cars from delivery.
	 * update the view spot data-reference and railcar number
	 *
   */
	$('#removeCarBtn').on('click', function (e) {
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		socket.delete('/api/carsfromdelivery/' + $('#railcarid').val(), function (car) {
			// UI actions
			updateWagonCount();
			updateBarilCount();
			updateCarsFromDelivery();
			$('#' + car.spot_number).attr('data-reference', '').removeClass('full').find('.railcar').html('');
			$('#myModal').modal('toggle');
		});

	})



	// Validator configuration
	window.ParsleyValidator.addValidator('railcars', function (value, requirement) {
		for(var i=0, len=GLOBAL_CARS_UNPROCESSED.length; i < len; i++) {
			if (GLOBAL_CARS_UNPROCESSED[i].Railcar === value) {
				return true;
			}
		}
		return false;
	});
	// Validator add message for the railcars validation
	window.ParsleyValidator.addMessage('fr', 'railcars', 'Le numero du wagon doit faire partie de la liste suggeree');


	var LIVRAISON_ID;
	var SPOT;

	window.ParsleyValidator.addValidator('taken', function (value, requirement) {
		var car = findCarFromDelivery(value);
		console.log(car);
		if (!car) return true;
		SPOT = car.spot_number;
		LIVRAISON_ID = car.delivery_id;
		return false;
	});

	window.ParsleyValidator.addMessage('fr', 'already-taken', 'Ce wagon est deja present dans la livraison #' + LIVRAISON_ID + ' a la place: ' + SPOT);


	/**
	 * findCarId
	 * This function filter the found railcar against the GLOBAL_CARS_UNPROCESSED to find the RailCarID of the wagon.
	 * This is essential because the railcar number is what they use in the view but not in the database.
	 * 
   */
	function findCarId (railcar) {
		for(var i=0, len=GLOBAL_CARS_UNPROCESSED.length; i < len; i++) {
			if (GLOBAL_CARS_UNPROCESSED[i].Railcar === railcar) {
				return GLOBAL_CARS_UNPROCESSED[i].RailCarID;
			}
		}
		return false;
	}	


	function findCarFromDelivery (railcar) {
		for(var i=0, len=GLOBAL_CARS_FROM_DELIVERY.length; i < len; i++) {
			if (GLOBAL_CARS_FROM_DELIVERY[i].Railcar === railcar) {
				return GLOBAL_CARS_FROM_DELIVERY[i];
			}
		}
		return false;

	}

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
			$.each(GLOBAL_CARS_UNPROCESSED, function (i, car) {
				if (substringRegex.test(car.Railcar)) {
					matches.push({ value: car.Railcar });
				}
			});
			cb(matches);
		}
	}


	// Update the wagon count in the delivery statistics table
	function updateWagonCount () {
		socket.get('/api/delivery/wagon-count', { id: delivery_id }, function (response) {
			$('#wagonCount').html(response.count + ' / 60');
		});
	}


	// Update the baril count in the delivery statistics table
	function updateBarilCount () {
		socket.get('/api/delivery/baril-count', { id: delivery_id }, function (response) {
			var count = response.count === null ? 0 : response.count;
			$('#barilCount').html(count.toFixed(1));
		})
	}


	function updateCarsFromDelivery () {
		socket.get('/api/carsfromdelivery', function (cars) {
			GLOBAL_CARS_FROM_DELIVERY = cars;
		});
	}
	


});


