$(document).ready(function () {

	var delivery_id = $('#transfersheetId').val();
	
	socket.get('/api/delivery/wagon-count', { id: delivery_id }, function (response) {
		$('#wagonCount').html(response.count);
		socket.get('/api/delivery/baril-count', { id: delivery_id }, function (response) {
			var count = response.count == null ? 0 : response.count;
			$('#barilCount').html(count.toFixed(1));
			window.print();
		});
	});


})