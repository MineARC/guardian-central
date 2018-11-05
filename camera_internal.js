var request = require('request');
var db = require('./database');

async function poll(guardian) {
  db.query('SELECT * FROM guardians WHERE name = ?', guardian)
      .then(rows => {
        request.get(
            'http://' + rows[0].ip + '/api/camera/internal',
            function(err, res, body) {
              if (err) {
                console.log('error: ' + err);
              } else if (res && res.statusCode) {
                return body;
              }
            });
      })
      .catch(err => {
        console.log('error: ' + err);
      });
}

module.exports = poll;