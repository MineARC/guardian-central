var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/', function(req, res, next) {
  var data = {};
  db.query('SELECT * FROM guardians')
      .then(rows => {
        data['hosts'] = rows;
        res.render('settings', data);
      })
      .catch(err => {
        console.log('error: ' + err);
      });
});

router.post('/addGuardian', function(req, res, next) {
  var value = req.body.alias.trim();

  db.query(
        'INSERT INTO guardians (name, ip, type) values (?, ?, ?)', value, value,
        0)
      .then(rows => {
        return res.send('Alias Updated');
      })
      .catch(err => {
        console.log('error: ' + err);
        return res.send('Invalid information supplied');
      });
});

module.exports = router;