var request = require('request');
var db = require('./database');

setInterval(poll, 30000);
poll();

async function poll() {
  var rows = await db.query('SELECT * FROM guardians')
                 .then(rows => {
                   return rows;
                 })
                 .catch(err => {
                   console.log('error: ' + err);
                 });

  rows.forEach(element => {
    request.get('http://' + element.ip + '/api/overview', function(err, res, body) {
      if (err) {
        console.log('error: ' + err);
      } else if (res && res.statusCode) {
        body = JSON.parse(body);
        if (body.guardian) {
          db.query(
                'UPDATE guardians SET name = (?), alias = (?), type = (?), lastseen = now(), alarms_total = (?), alarms_active = (?) WHERE ip = (?)',
                [body.hostname, body.alias, body.type, body.alarms_total, body.alarms_active, element.ip])
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log('error: ' + err);
              });
        }
      }
    });
  });
}