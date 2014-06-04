(function () {




	$('#deliveries tr').each(function (i, tr) {
		var id = $(this).attr('id');
		console.log(id);
		var $wagonCountElement = $(this).find('.delivery-wagon_count');
		var $barilCountElement = $(this).find('.delivery-baril_count');
		socket.get('/archivedelivery/' + id + '/wagon-count', function (response) {
			$wagonCountElement.html(response.count);
		});
		// socket.get('/delivery/' + id + '/baril-count', function (response) {
		// 	console.log(response);
		// 	$barilCountElement.html(response.count);
		// })
	});



	$('#deliveries tr').on('click', function (e) {
		if (e.target.nodeName == 'TD') {
			e.preventDefault();
			var id = $(this).find('.delivery-id').html();
			window.location='/archives/delivery/' + id;
			return;		
		}
	})


})();

