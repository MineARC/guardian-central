var dataLength = 8630; // number of dataPoints visible at any point

var name = window.location.pathname.split('/').slice(-1)[0];

$(document).ready(function($) {
  $('#alias').editable({
    type : 'text',
    mode : 'inline',
    showbuttons : false,
    url : function(params) {
      var d = new $.Deferred();
      $.post('/settings/setAlias', {alias : params.value}).then(function() { d.resolve(); });
      return d.promise();
    }
  });
});

// // Updates the active alarms from the api
// function updateAlarms(data) {
//   var html = '';
//   for (key in data) {
//     if (data[key].state)
//       html += '<p class="alert alert-danger">' + key;
//   }
//   $('#alarms').html(html);
// }

$.get('/api/monitor/history/' + name).then(function(data) {
  if (data.elv)
    try {updateELVHistory(data.elv);} catch(e) {};
  if (data.elvp)
    try {updateELVPHistory(data.elvp);} catch(e) {};
  if (data.series3)
    try {updateSeries3History(data.series3);} catch(e) {};
  if (data.series4)
    try {updateSeries4History(data.series4);} catch(e) {};
  if (data.aura)
    try {updateAuraHistory(data.aura);} catch(e) {};
  updatefromapi();
});

// Update charts, tables, and alarms after specified time.
setInterval(updatefromapi, 10000);

function updatefromapi() {
  $.get('/api/monitor/' + name).then(function(data) {
    if (data.elv)
      try {updateELV(data.elv);} catch(e) {};
    if (data.elvp)
      try {updateELVP(data.elvp);} catch(e) {};
    if (data.series3)
      try {updateSeries3(data.series3);} catch(e) {};
    if (data.series4)
      try {updateSeries4(data.series4);} catch(e) {};
    if (data.cams)
     try {updateCams(data.cams);} catch(e) {};
    if (data.aura)
      try {updateAura(data.aura);} catch(e) {};
    if (data.battmon)
      try {updateBattmon(data.battmon);} catch(e) {};
    // updateAlarms(data.alarms);
  });
}