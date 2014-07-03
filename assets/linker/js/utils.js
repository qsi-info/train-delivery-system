window.Utils = window.Utils || {};

Utils.popupWindow = function (url, width, height) {
	var newwindow;
  var  screenX     = typeof window.screenX     != 'undefined' ? window.screenX     : window.screenLeft,
       screenY     = typeof window.screenY     != 'undefined' ? window.screenY     : window.screenTop,
       outerWidth  = typeof window.outerWidth  != 'undefined' ? window.outerWidth  : document.body.clientWidth,
       outerHeight = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.body.clientHeight - 22),
       width    = width,
       height   = height,
       left     = parseInt(screenX + ((outerWidth - width) / 2), 10),
       top      = parseInt(screenY + ((outerHeight - height) / 2.5), 10),
       features = (
          'width='   + width +
          ',height=' + height +
          ',left='   + left +
          ',top='    + top +
          ', scrollbars=no, menubar=no, toolbar=no, status=no, location=no, directories=no'
        );

  newwindow=window.open(url,'',features);

  if (window.focus) {
    newwindow.focus();
  }
  return newwindow;
}


function isInt(n) {
   return typeof n === 'number' && n % 1 == 0;
}