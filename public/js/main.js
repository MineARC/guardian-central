$(document).ready(function($) {
  setInterval(updateFleetAndAlerts, 10000);
  updateFleetAndAlerts();

  function updateFleetAndAlerts() {
    $.get('/api/hosts/').then(function(data) {
      var fleethtml = '';
      var alertshtml = '';
      for (var host in data) {
        fleethtml += '<li><a href="/chamber/' + data[host].hostname + '"><i class="icon-tag"></i><span>' +
                     (data[host].alias ? data[host].alias : data[host].hostname.split('-')[1]) + '</span></a></li>';
        for (var types in data[host].alarms_active) {
          for (var alert in data[host].alarms_active[types]) {
            alertshtml +=
                '<li class="list-group-item"><div class="clear"><i class="fa fa-exclamation-circle m-r-xs"></i><span class="alef">' +
                data[host].alarms_active[types][alert] + '</span></div><small class="text-muted">' + (data[host].alias ? data[host].alias : data[host].hostname.split('-')[1]) +
                '</small></li>';
          }
        }
      }
      $('#fleet').html(fleethtml);
      $('#alerts').html(alertshtml);
    });
  }
});