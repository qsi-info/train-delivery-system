
(function () {

	$('.delivery-delete-btn').on('click', function (e) {
		e.preventDefault();
		var delivery = $(this).attr('data-id');
		socket.get('/delivery/' + delivery + '/wagon-count', function (response) {
			if (response.count > 0) {
				return window.alert('Vous devez vider la livraison afin de pouvoir la supprimer');				
			}
			if (window.confirm('Etes-vous certain de vouloir supprimer cette livraison')) {
				socket.delete('/delivery/' + delivery, function (delivery) {
					$('#' + delivery.id).remove();
					return;
				})
			}
		})
	});


	$('#deliveries tr').on('click', function (e) {
		if (e.target.nodeName == 'TD') {
			e.preventDefault();
			var id = $(this).find('.delivery-id').html();
			window.location='/delivery/manage/' + id;
			return;		
		}
	})


	$('#deliveries tr').each(function (i, tr) {
		var id = $(this).attr('id');
		var $wagonCountElement = $(this).find('.delivery-wagon_count');
		var $barilCountElement = $(this).find('.delivery-baril_count');
		socket.get('/delivery/' + id + '/wagon-count', function (response) {
			$wagonCountElement.html(response.count);
		});
		socket.get('/delivery/' + id + '/baril-count', function (response) {
			console.log(response);
			$barilCountElement.html(response.count);
		})
	})

})()

