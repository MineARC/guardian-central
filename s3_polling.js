var request = require('request');
var cams_polling = require('./cams_polling');
var db = require('./database');

setInterval(poll, 30000);
poll();

async function poll() {
  var rows =
      await db
          .query(
              'SELECT * FROM guardians g JOIN guardian_types gt ON g.type = gt.index WHERE nickname LIKE "s3"')
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
        body = JSON.parse(body);
        if (body.series3) {
          db.query(
                'INSERT INTO s3_data VALUES ((SELECT name FROM guardians WHERE ip = ?), now(), ?)',
                [element.ip, body.series3])
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log('error: ' + err);
              });
        }
        if (body.cams) {
          cams_polling(db, body.cams);
        }
      }
    });
  });
}