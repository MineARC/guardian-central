var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/:guardian_id', function(req, res, next) {
  db.getConnection()
      .then(conn => {
        conn.query('SELECT * FROM guardians WHERE name = ?', req.params.guardian_id)
            .then(id => {
              var data = {};
              data['alias'] = id[0].alias;
              data['localize'] = 'au';

              var auraPromise =
                  conn.query('SELECT * FROM aura_data WHERE guardian = ? ORDER BY time DESC LIMIT 1;', req.params.guardian_id);
              auraPromise
                  .then(rows => {
                    if (rows.length > 0) {
                      data['aura'] = JSON.parse(rows[0].data);
                    }
                  })
                  .catch(console.log);

              var camsPromise =
                  conn.query('SELECT * FROM cams_data WHERE guardian = ? ORDER BY time DESC LIMIT 1;', req.params.guardian_id);
              camsPromise
                  .then(rows => {
                    if (rows.length > 0) {
                      data['cams'] = JSON.parse(rows[0].data);
                    }
                  })
                  .catch(console.log);

              var dataPromise;
              switch (id[0].type) {
              case 0: // ELV
                dataPromise = conn.query('SELECT * FROM elv_data WHERE guardian = ? ORDER BY time DESC LIMIT 1;', req.params.guardian_id);
                dataPromise.then(rows => { data['elv'] = JSON.parse(rows[0].data); }).catch(console.log);
                break;
              case 1: // ELVP
                dataPromise = conn.query('SELECT * FROM elvp_data WHERE guardian = ? ORDER BY time DESC LIMIT 1;', req.params.guardian_id);
                dataPromise.then(rows => { data['elvp'] = JSON.parse(rows[0].data); }).catch(console.log);
                break;
              case 2: // Series 3
                dataPromise = conn.query('SELECT * FROM s3_data WHERE guardian = ? ORDER BY time DESC LIMIT 1;', req.params.guardian_id);
                dataPromise.then(rows => { data['series3'] = JSON.parse(rows[0].data); }).catch(console.log);
                break;
              case 3: // Series 4
                dataPromise = conn.query('SELECT * FROM s4_data WHERE guardian = ? ORDER BY time DESC LIMIT 1;', req.params.guardian_id);
                dataPromise.then(rows => { data['series4'] = JSON.parse(rows[0].data); }).catch(console.log);
                break;
              case 4: // Battery Monitor
                dataPromise =
                    conn.query('SELECT * FROM battmon_data WHERE guardian = ? ORDER BY time DESC LIMIT 1;', req.params.guardian_id);
                dataPromise.then(rows => { data['battmon'] = JSON.parse(rows[0].data); }).catch(console.log);
                break;
              }
              Promise.all([ auraPromise, camsPromise, dataPromise ]).then(values => { res.render('home', data); });
            })
            .catch(console.log)
            .then(conn.end);
      })
      .catch(console.log);
  ;
});

module.exports = router;