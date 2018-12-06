var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/', function(req, res, next) {
  var data = {};
  data['localize'] = 'au';
  res.render('contact', data);
});

module.exports = router;