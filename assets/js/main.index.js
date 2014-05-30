(function () {

	socket.get('/delivery/count', function (response) {
		if (response.count > 0) $('#deliveryCountNotification').html(response.count);
	});

})();