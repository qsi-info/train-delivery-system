
(function () {


	// ----------------------
	// UI 
	// ------------------------


	var UI = {

		loading: function () {
			$('body').addClass('loading');
		},

		finishLoading: function () {
			$('body').removeClass('loading');
		},

	};



	$('.delivery-delete-btn').on('click', function (e) {
		e.preventDefault();
		var delivery = $(this).attr('data-id');
		socket.get('/delivery/' + delivery + '/wagon-count', function (response) {
			if (response.count > 0) {
				return window.alert('Vous devez vider la livraison afin de pouvoir la supprimer!');				
			}
			if (window.confirm('Etes-vous certain de vouloir supprimer cette livraison?')) {
				socket.delete('/delivery/' + delivery, function (delivery) {
					$('#' + delivery.id).remove();
					return;
				})
			}
		})
	});



	$('.archive-link').on('click', function (e) {
		e.preventDefault();
		if (window.confirm('Etes vous certain de vouloir archiver cette livraison ainsi que tout les wagons incut?')) {
			window.location = $(this).attr('href');
		}
	});


	$('#deliveries tr').on('click', function (e) {
		if (e.target.nodeName == 'TD') {
			e.preventDefault();
			var id = $(this).find('.delivery-id').html();
			window.location='/delivery/manage/' + id;
			return;		
		}
	})


	// $('.report-sealsheet-link').on('click', function (e) {
	// 	e.preventDefault();
	// 	var firstSeal = window.prompt('Entrez le premier numero de seal', '4989501');
	// 	window.location = $(this).attr('href') + '/' + firstSeal;
	// });


	$('#deliveries tr').each(function (i, tr) {
		var $row = $(this);
		var id = $(this).attr('id');
		var $wagonCountElement = $(this).find('.delivery-wagon_count');
		var $barilCountElement = $(this).find('.delivery-baril_count');
		socket.get('/delivery/' + id + '/wagon-count', function (response) {
			$wagonCountElement.html(response.count);
			switch(response.count) {
				case 0  : $row.addClass('warning'); break;
				case 60 : $row.addClass('success'); break;
				default: $row.addClass('info'); break;
			}
		});
		// socket.get('/delivery/' + id + '/baril-count', function (response) {
		// 	console.log(response);
		// 	$barilCountElement.html(response.count);
		// })
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

	$('.report-endday').on('click', function (e) {
		e.preventDefault();
		var destination = window.prompt('Entrez la destination');

		socket.get($(this).attr('href')+'?destination='+destination, function (response) {
			var url = 'http://parachemsrv07/Reports/Pages/Report.aspx?ItemPath=%2fEndDay';
			Utils.popupWindow(url, 1200, 800);
			$('#printModal').modal('toggle');
		})
	})


	$('.report-sealsheet').on('click', function (e) {
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


})()

