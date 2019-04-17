$(document).ready(function($) {
  var external_showing = $('#external');
  var timeout;
  var timestamp = Date.now();
  $('#external').bind('load', update_external_image);

  update_external_image();

  function update_external_image() {
    if (timestamp + 5000 <= Date.now()) {
      external_showing.attr(
          'src',
          '/api/camera/external/' +
              window.location.pathname.split('/').slice(-1)[0] + '?' +
              Math.floor(Date.now() / 5000));
      clearTimeout(timeout);
      timeout = setTimeout(update_external_image, 20000);
      timestamp = Date.now();
    } else {
      setTimeout(update_external_image, Date.now - timestamp + 5000);
    }
  }
});