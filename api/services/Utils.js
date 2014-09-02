

exports.formatDate = function (date, fomat) {
	var format = typeof format === 'undefined' ? 'DD MMM YYYY HH:mm' : format;
	var moment = require('moment');
	moment.locale(sails.config.i18n.defaultLocale);
	return moment(date).format(format);
},


exports.todayDate = function () {
	var format = 'DD MMM YYYY ';
	var moment = require('moment');
	moment.locale(sails.config.i18n.defaultLocale);
	return moment().format(format);
}


exports.JSONFixParse = function (str) {
	return JSON.parse(str.replace(/'/ig, '"'));
};