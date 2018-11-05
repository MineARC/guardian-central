var express = require('express');
var router = express.Router();
var db = require('../database');


/* GET api for overview. */
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM guardians')
      .then(rows => {
        data = {};
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
        res.json(data);
      })
      .catch(err => {
        console.log('error: ' + err);
      });
});

module.exports = router;