var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/', function(req, res, next) { res.render('settings'); });

router.post('/addGuardian', function(req, res, next) {
  var value = req.body.ip.trim();
  db.getConnection()
      .then(conn => {
        conn.query('INSERT INTO guardians (name, ip, type) values (?, ?, ?)', [ value, value, 0 ])
            .then(res.send('Host Added'))
            .catch(err => {
              console.log(err);
              res.send('Invalid information supplied');
            })
            .then(conn.end());
      })
      .catch(console.log);
});

router.post('/delGuardian', function(req, res, next) {
  var value = req.body.ip.trim();
  db.getConnection()
      .then(conn => {
        conn.query('DELETE FROM guardians WHERE ip = ?', value)
            .then(res.send('Host Removed'))
            .catch(err => {
              console.log(err);
              res.send('Invalid information supplied');
            })
            .then(conn.end());
      })
      .catch(console.log);
});

module.exports = router;