exports.test = function (model) {

	// return "";

	// var acc="<h1>Hello World</h1>";
	// model.find().exec(function (err, units) {
	// 	_.each(units, function (unit) {
	// 		for (var prop in unit) {
	// 			if (unit.hasOwnProperty(prop)) {
	// 				// acc += "<li>" + unit[prop] + "</li>";
	// 			}
	// 		}
	// 	});
	// 	return acc;
	// })
}



exports.buildTable = function (units) {
	var acc = "<table class='table table-hover'>";
	acc += "<thead>";
	for (var prop in units[0]) {
		if (units[0].hasOwnProperty(prop)) {
			acc += "<th>" + prop + "</th>";
		}
	}
	acc += "</thead>";
	acc += "<tbody>";

	_.each(units, function (unit) {
		acc += "<tr>";
		for (var prop in unit) {
			if (unit.hasOwnProperty(prop)) {
				acc += "<td>" + unit[prop] + "</td>";
			}
		}
		acc += "</tr>";

		// acc += "<li>" + unit.id + "</li>";
	});
	acc += "</tbody>";
	acc += "</table>";

	return acc;

}