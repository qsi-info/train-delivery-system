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




function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}



