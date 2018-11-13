var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/', function(req, res, next) {
  var data = {};
  data['localize'] = 'au';

  db.query('SELECT * FROM guardians')
      .then(rows => {
        data['hosts'] = [];
        for (var index = 0; index < rows.length; index++) {
          var row = rows[index];
          data['hosts'][index] = {
            guardian: true,
            hostname: row.name,
            alias: row.alias,
            type: row.type,
            alarms_total: row.alarms_total,
            alarms_active: JSON.parse(row.alarms_active)
          };
        }
        res.render('contact', data);
      })
      .catch(err => {
        console.log('error: ' + err);
      });
});

module.exports = router;