$(document).ready(function () {


	socket.get('/api/delivery/count', function (response) {
		$('#deliveryCountNotification').html(response.count);
	});

	

})