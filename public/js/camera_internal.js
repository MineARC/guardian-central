$(document).ready(function($) {
  var internal_showing = $('#internal');
  var timeout;
  var timestamp = Date.now();
  $('#internal').bind('load', update_internal_image);

  update_internal_image();

  function update_internal_image() {
    if (timestamp + 5000 <= Date.now()) {
      internal_showing.attr(
          'src',
          '/api/camera/internal/' +
              window.location.pathname.split('/').slice(-1)[0] + '?' +
              Math.floor(Date.now() / 5000));
      clearTimeout(timeout);
      timeout = setTimeout(update_internal_image, 20000);
      timestamp = Date.now();
    } else {
      setTimeout(update_internal_image, Date.now - timestamp + 5000);
    }
  }
});