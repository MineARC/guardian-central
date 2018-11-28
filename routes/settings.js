var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/', function(req, res, next) {
  var data = {};
  db.query('SELECT * FROM guardians')
  var hostsPromise = db.query('SELECT * FROM guardians');
  hostsPromise
      .then(rows => {
        data['hosts'] = {};
        for (var index = 0; index < rows.length; index++) {
          var row = rows[index];
          data['hosts'][index] = {
            guardian: true,
            ip: row.ip,
            hostname: row.name,
            alias: row.alias,
            type: row.type,
            alarms_total: row.alarms_total,
            alarms_active: {},
            lastseen: row.lastseen
          };
          try {
            data['hosts'][index].alarms_active = JSON.parse(row.alarms_active);
          } catch (e) {
            // JSON Error
          }
        }
        res.render('settings', data);
      })
      .catch(err => {
        console.log('error: ' + err);
      });
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