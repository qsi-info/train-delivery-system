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
};




var WindowAlert = function () {
  var $modal = $('#alert');
  var $message = $modal.find('#alertMessage');

  return {

    setMessage: function (message) {
      $message.html(message);
    },

    show: function () {
      $modal.modal('show');
    },

  }
};




var WindowConfirm = function () {
  var $modal = $('#confirm');
  var $message = $('#confirmMessage');

  $modal.on('hide.bs.modal', function () {
    $('#confirmConfirmButton').off('click');
    $('#confirmCloseButton').off('click');
  })

  return {

    setMessage: function (message) {
      $message.html(message);
    },

    setConfirm: function (cb) {
      var cb = typeof cb !== 'undefined' ? cb : function () {};
      $('#confirmConfirmButton').on('click', function (e) {
        e.preventDefault();
        cb(true);
        $modal.modal('hide');
      })
    },

    setClose: function (cb) {
      var cb = typeof cb !== 'undefined' ? cb : function () {};
      $('#confirmCloseButton').on('click', function (e) {
        e.preventDefault();
        cb(false);
        $modal.modal('hide');
      });
    },

    show: function () {
      $modal.modal('show');
    },

  }


};





