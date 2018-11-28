var request = require('request');
var aura_polling = require('./aura_polling');
var cams_polling = require('./cams_polling');
var db = require('./database');

setInterval(poll, 30000);
poll();

async function poll() {
  var rows =
      await db
          .query(
              'SELECT * FROM guardians g JOIN guardian_types gt ON g.type = gt.index WHERE nickname LIKE "elv"')
          .then(rows => {
            return rows;
          })
          .catch(err => {
            console.log('error: ' + err);
          });

  rows.forEach(element => {
    request.get('http://' + element.ip + '/api/monitor', function(err, res, body) {
      if (err) {
        console.log('error: ' + err);
      } else if (res && res.statusCode) {
        var validJSON = false;
        try {
          body = JSON.parse(body);
          validJSON = true;
        } catch (e) {
          // JSON Error
        }
        if (validJSON) {
          if (body.elv) {
            db.query(
                  'INSERT INTO elv_data (guardian, time, data) VALUES ((SELECT name FROM guardians WHERE ip = ?), now(), ?)',
                  [
                    element.ip, body.elv /*body.elv.mains, body.elv.inverter,
                     body.elv.serial.V, body.elv.serial.I, body.elv.serial.P,
                     body.elv.serial.CE*/
                  ])
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  console.log('error: ' + err);
                });
          }
          if (body.cams) {
            cams_polling(db, element.ip, body.cams);
          }
          if (body.aura) {
            aura_polling(db, element.ip, body.aura);
          }
        }
      }
    });
  });
}