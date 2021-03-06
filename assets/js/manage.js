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
			if (railcar.delivery != '                                    ' && railcar.delivery != delivery) return;

			// If spot is empty, find the spot with the number and apply the remove transformations.
			if (railcar.spot == '') return UI.Railcar.remove(railcar);

			console.log('Update controlle action');

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
				if (foundRailcar.isProcessed && !foundRailcar.isDefect) return UI.Exceptions.railcarAlreadyUsed(foundRailcar);
				
				// Informations that need to be update
				var updateInformations = {
					isProcessed : !railcar.isDefect,
					delivery    : railcar.delivery,
					spot        : railcar.spot,
					Status      : 'Y',
					color       : 'full',
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
				color       : '',
			}

			// Update railcar informations to free to the spot.
			socket.put('/railcar/' + railcar.id, updateInformations, function (railcar) {
				
				// Call UI action for finish remove
				return UI.Railcar.finishRemove(railcar);

			});

		},


		create: function (railcar) {

			socket.post('/railcar', railcar, function (railcar) {
					// Call UI action for finish update
				return UI.Railcar.finishCreate(railcar);

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


		changeStatus: function (railcar, status, cb) {
			var updateInformations = {
				Status: status ? 'Y' : 'N',
				color: status ? 'full' : 'defective',
				isDefect: !status,
				isProcessed: status,
			};

			socket.put('/railcar/' + railcar, updateInformations, cb);
		},

		changeNetVolBBL: function (railcar, vol, cb) {
			var updateInformations = {
				netVolBBL: vol,
			};

			socket.put('/railcar/' + railcar, updateInformations, cb);
		}

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
			$spot.removeClass('full');
			$spot.removeClass('defective');
			$spot.removeClass('manual');
			$spot.removeClass('incorrect');
			// $spot.addClass('full');
			$spot.addClass(railcar.color);
			if (railcar.netVolBBL < 500 || railcar.netVolBBL > 800) {
				$spot.addClass('incorrect');
			}
			if (railcar.isDefect) {
				$spot.addClass('defective');
			}
			$spot.find('.railcar').html(railcar.number);
			UI.Railcar.finishAdd();
		},

		remove: function (railcar) {
			var $railcar = $("[data-reference='" + railcar.number + "']");
			$railcar.attr('data-reference', '');
			$railcar.attr('data-id', '');
			$railcar.removeClass('full');
			$railcar.removeClass('defective');
			$railcar.removeClass('manual');
			$railcar.removeClass('incorrect');
			$railcar.find('.railcar').html('');
			UI.Railcar.finishRemove();
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

			$editNetVolBBLForm = $('#editNetVolBBLForm');
			$editNetVolBBLForm.find('#editNetVolBBLRailcarId').val(railcar.id);
			$editNetVolBBLForm.find('#editNetVolBBLInput').val(railcar.netVolBBL);

			$modal.find('#removeRailcarBillOfLading').html(railcar.billOfLading);
			$modal.find('#removeRailcarProduct').html(railcar.product);
			$modal.find('#removeRailcarSpot').html(railcar.spot);
			$modal.find('#removeRailcarDelivery').html(railcar.delivery);
			$modal.find('#removeRailcarTrain').html(railcar.train);
			$modal.find('#removeRailcarSeal1').html(railcar.seal1);
			$modal.find('#removeRailcarSeal2').html(railcar.seal2);
			$modal.find('#removeRailcarSeal3').html(railcar.seal3);
			// $modal.find('#removeRailcarNetVolBBL').html(railcar.netVolBBL);

			var $status = $modal.find('#removeRailcarStatus');
			var $statusSwitch = $modal.find('#myonoffswitch');
			var status = railcar.Status ? railcar.Status.trim() : 'Y';
			// if (status == 'Y') {
			// 	$statusSwitch.prop('checked', true);
			// }
			// if (status == 'N') {
			// 	$statusSwitch.prop('checked', false);
			// }

			$statusSwitch.prop('checked', !railcar.isDefect);

			$statusSwitch.attr('data-railcar', railcar.id);
			$modal.modal('toggle');
		},

		finishAdd: function (railcar) {
			// console.log('Add railcar: ', railcar);
			$('#ModalWagonAdd').modal('hide');
			UI.Railcar.getWagonCount();
			UI.Railcar.getBarilCount();
		},

		finishRemove: function (railcar) {
			// console.log('Remove railcar: ', railcar);
			$('#ModalWagonRemove').modal('hide');
			UI.Railcar.getWagonCount();
			UI.Railcar.getBarilCount();
		},

		finishCreate: function (railcar) {
			$('#ModalAdminAddRailcar').modal('hide');
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



	// ----------------------------
	// ROUTER
	// ----------------------------


	// Route incomming message from the socket
	socket.on('message', function (message) {

		// Check if the message is related to a railcar
		if (message.model == 'railcar') {
			// Switch depending on the message verb
			switch(message.verb) {	
				// When verd is update, call RailcarController.update
				case 'create' : 
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



	$('#AdminAddRailcarForm').on('submit', function (e) {
		e.preventDefault();

		if (window.confirm('Etes vous certain de vouloir ajouter ce wagon?')) {
			var railcar = {
				number: $(this).find("#railcar_number").val(),
				product: $(this).find("#railcar_product").val(),
				train: $(this).find("#railcar_train").val(),
				netVolBBL: $(this).find('#railcar_netVolBBL').val(),
				billOfLading: $(this).find('#railcar_billOfLading').val(),
				isProcessed: true,
				delivery: delivery,
				spot: $(this).find('#railcar_spot').val(),
				color: 'manual',
			}

			return RailcarController.create(railcar);		
		} else {
			$('#ModalAdminAddRailcar').modal('toggle');
		}



	});


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
		var firstSeal = window.prompt('Entrez le premier numero de seal');
		if (!isInt(window.parseInt(firstSeal))) {
			return window.alert('Le numero du seal doit etre un nombre entier.');
		}
		socket.get($(this).attr('href') + '/' + firstSeal, function (response) {
			var url = 'http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=%2fSealSheet';
			Utils.popupWindow(url, 1200, 800);
			$('#printModal').modal('toggle');
		})
	});

	$('.report-endday-link').on('click', function (e) {
		e.preventDefault();
		var destination = window.prompt('Entrez la destination');

		socket.get($(this).attr('href')+'?destination='+destination, function (response) {
			var url = 'http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=%2fEndDay';
			Utils.popupWindow(url, 1200, 800);
			$('#printModal').modal('toggle');
		});
	});


	$('.report-offload-data-link').on('click', function (e) {
		e.preventDefault();
		var operator = window.prompt('Entrez votre nom ou vos initial');
		socket.get($(this).attr('href') + "?operator=" + operator, function (response) {
			var url = 'http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=%2fOffloadData';
			Utils.popupWindow(url, 1200, 800);
			$('#printModal').modal('toggle');
		})
	});
	

	$('.report-mesure-link').on('click', function (e) {
		e.preventDefault();
		socket.get($(this).attr('href'), function (response) {
			var url = 'http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=%2fMesure';
			Utils.popupWindow(url, 1200, 800);
			$('#printModal').modal('hide');
		})
	});


	$('#addCarBtn').on('click', function (e) {
		if ($('#filterInput').val() == 'admin') {
			e.preventDefault();
			
			var spot = $('#ModalWagonAdd').find('.spot-title').html();
			$('#ModalWagonAdd').modal('toggle');
			$('#ModalAdminAddRailcar').find('#railcar_spot').val(spot);
			$('#ModalAdminAddRailcar').modal('toggle');
		}
	});



	$('#myonoffswitch').on('change', function (e) {
		var railcar = $(this).attr('data-railcar');
		var status = $(this).prop('checked');
			$('#ModalWagonRemove').modal('toggle');

		RailcarController.changeStatus(railcar, status, function () {
			UI.Railcar.finishAdd();
		})
	});



	$('#changeNetVolBBLButton').on('click', function (e) {
		e.preventDefault();
		var $editNetVolBBLForm = $('#editNetVolBBLForm');
		var railcar = $editNetVolBBLForm.find('#editNetVolBBLRailcarId').val();
		var netVolBBL = $editNetVolBBLForm.find('#editNetVolBBLInput').val();
		// console.log(railcar);
			$('#ModalWagonRemove').modal('toggle');
		RailcarController.changeNetVolBBL(railcar, netVolBBL, function () {
			UI.Railcar.finishAdd();
		}) 
	})

	// -----------------------
	// TypeAheadh plugin 
	// -----------------------

	// When the ModalWagonAdd is trigger, get all unprocessed railcars
	$('#ModalWagonAdd').on('show.bs.modal', function () {
		socket.get('/railcar', { isProcessed: false },  function (railcars) {
			GLOBAL_UNPROCESSED_RAILCARS = railcars;
		});
	});

	$('#ModalAdminAddRailcar').on('hide.bs.modal', function () {
		$('#AdminAddRailcarForm').parsley().reset();
	})

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


})();