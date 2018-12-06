var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/', function(req, res, next) {
  res.render('settings');
});

router.post('/addGuardian', function(req, res, next) {
  var value = req.body.ip.trim();

  db.query(
        'INSERT INTO guardians (name, ip, type) values (?, ?, ?)',
        [value, value, 0])
      .then(rows => {
        return res.send('Host Added');
      })
      .catch(err => {
        console.log('error: ' + err);
        return res.send('Invalid information supplied');
      });
});

router.post('/delGuardian', function(req, res, next) {
  var value = req.body.ip.trim();

  db.query('DELETE FROM guardians WHERE ip = ?', value)
      .then(rows => {
        return res.send('Host Removed');
      })
      .catch(err => {
        console.log('error: ' + err);
        return res.send('Invalid information supplied');
      });
});

module.exports = router;