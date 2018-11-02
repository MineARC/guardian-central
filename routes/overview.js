var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET overview page. */
router.get('/', function(req, res, next) {
  var data = {};
  db.query('SELECT * FROM guardians')
      .then(rows => {
        data['hosts'] = rows;
        console.log(data);
        res.render('overview', data);
      })
      .catch(err => {
        console.log('error: ' + err);
      });
});

module.exports = router;