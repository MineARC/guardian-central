var request = require('request');
var db = require('./database');

setInterval(poll, 30000);
poll();

function poll() {
  db.getConnection()
      .then(conn => {
        conn.query('SELECT * FROM guardians')
            .then(rows => { rows.forEach(element => { single(element); }); })
            .catch(console.log)
            .then(conn.release);
      })
      .catch(console.log);
}

function single(element) {
  request.get('http://' + element.ip + '/api/overview', function(err, res, body) {
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
        if (body.guardian) {
          db.getConnection()
              .then(conn => {
                conn.query(
                        'UPDATE guardians SET name = (?), alias = (?), type = (?), lastseen = now(), alarms_total = (?), alarms_active = (?) WHERE ip = (?)',
                        [ body.hostname, body.alias, body.type, body.alarms_total, body.alarms_active, element.ip ])
                    .then(console.log)
                    .catch(console.log)
                    .then(conn.release);
              })
              .catch(console.log);
        }
      }
    }
  });
}