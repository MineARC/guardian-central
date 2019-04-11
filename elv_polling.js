var request = require('request');
var aura_polling = require('./aura_polling');
var cams_polling = require('./cams_polling');
var db = require('./database');

setInterval(poll, 30000);
poll();

function poll() {
  db.getConnection()
      .then(conn => conn.query('SELECT * FROM guardians g JOIN guardian_types gt ON g.type = gt.index WHERE nickname LIKE "elv"'))
      .then(rows => { rows.forEach(element => { single(element); }); })
      .catch(console.log)
      .finally(() => {
        if (conn)
          conn.end();
      });
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
        if (body.elv) {
          db.getConnection()
              .then(conn => conn.query(
                        'INSERT INTO elv_data (guardian, time, data) VALUES ((SELECT name FROM guardians WHERE ip = ?), now(), ?)',
                        [ element.ip, body.elv ]))
              .then(res => { console.log(res); })
              .catch(console.log)
              .finally(() => {
                if (conn)
                  conn.end();
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
}