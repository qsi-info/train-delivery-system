$(document).ready(function () {

	// Subscribe to Delivery Model 
	socket.get('/subscribe/delivery', function (message) { console.log (message) } );


	socket.on('message', function (message) {
		// Check if message is related to the delivery
		if (message.model != 'delivery') return;

		switch(message.verb) {

			// case 'create'  : window.DeliveryManager.create(message); break;
			// case 'update'  : window.DeliveryManager.update(message); break;
			// case 'destroy' : 

		}

	})


	var list;

	var DeliveryList = function (deliveries) {
		this.deliveries = ko.observableArray(deliveries);
		this.removeDelivery = function (delivery) {
			var self = this;
			socket.delete('/delivery/' + delivery.id, function (response) {
				self.deliveries.remove(delivery);
			})
		}.bind(this);
	} 


	socket.get('/delivery', function (deliveries) {
		list = new DeliveryList(deliveries);
		ko.applyBindings(list, document.getElementById('deliveryTable'));
	})



})





// window.DeliveryManager = (function () {

// 	var $table = $('#deliveryTable > tbody');


// 	var DELIVERY_ROW_TEMPLATE = "<tr data-id='{{ id }}'><td> {{ id }}</td><td>{{ status }}</td><td>{{ createdAt }}</td><td><button class='btn btn-danger delete-delivery-button'>Supprimer</button></td></tr>"


// 	$table.on('click', '.delete-delivery-button', function (e) {
// 		e.preventDefault();
// 		var delivery_id = $(this).parent().parent().attr('data-id');
// 		socket.delete('/delivery/' + delivery_id, function (response) {
// 			window.DeliveryManager.destroy({ id: delivery_id });
// 		})
// 	});


// 	var createdElements = [];


// 	return {

// 		create: function (message) {
// 			console.log('DeliveryManager.create :: ', message);
// 			var delivery = {
// 				id: message.id,
// 				status: message.data.status,
// 				createdAt: message.data.createdAt,
// 			}
// 			var el = $(Mustache.render(DELIVERY_ROW_TEMPLATE, delivery));
// 			$table.append(el);
// 			createdElements.push(el);
// 		},

// 		update: function (message) {
// 			console.log('DeliveryManager.update :: ', message);
// 			console.log($table.find("[data-id="+message.id+"]"));
// 		},

// 		destroy: function (message) {
// 			console.log('DeliveryManager.destroy :: ', message);
// 			var $elements = $("tr[data-id="+message.id+"]");
// 			if ($elements.length > 0) {
// 				return $elements.remove();
// 			}
// 			$.each(createdElements, function (i, el) {
// 				if (el.attr('data-id') == message.id) {
// 					return $(el).remove();
// 				}
// 			});
// 		},
// 	}
// })();

