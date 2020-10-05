var request = require('request');
var aura_polling = require('./aura_polling');
var cams_polling = require('./cams_polling');
var db = require('./database');

setInterval(poll, 30000);
poll();

async function poll() {

  db.getConnection()
      .then(conn => {
        conn.query('SELECT * FROM guardians g JOIN guardian_types gt ON g.type = gt.index WHERE nickname LIKE "battmon"')
            .then(rows => { rows.forEach(element => { single(element); }); })
            .catch(console.log)
            .then(conn.release);
      })
      .catch(console.log);
}

function single(element) {
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
        if (body.battmon) {
          db.getConnection()
              .then(conn => {
                conn.query('INSERT INTO battmon_data (guardian, time, data) VALUES ((SELECT name FROM guardians WHERE ip = ?), now(), ?)',
                           [ element.ip, body.battmon ])
                    .then(console.log)
                    .catch(console.log)
                    .then(conn.release);
              })
              .catch(console.log);
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
}