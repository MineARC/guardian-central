$(document).ready(function($) {
  // Show a confirmation box to delete an email for the database
  $('.btn-delete').click(function(event) {
    var ip = $(this).data('ip');
    bootbox.confirm('Are you sure you wish to remove ' + ip, function(result) {
      if (result) {
        $.post('/settings/delGuardian', {ip: ip})
        $(this).closest('tr').hide();
      }
    });
  });

  // Attempt to add ip to the database else show error box
  $('#btn-add').click(function(event) {
    add_ip($(this).closest('form.input-group'));
    $('#form-add input').val('');
  });

  // Same as above for pressing enter
  $('#form-add').keypress(function(event) {
    if ('13' == (event.keyCode ? event.keyCode : event.which)) {
      add_ip(this);
      $('#form-add input').val('');
    }
  });

  function add_ip(event) {
    var ip = $(event).find('input').val();
    $.post('/settings/addGuardian', {ip: ip});
  }
});
