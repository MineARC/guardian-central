var express = require('express');
var router = express.Router();
var db = require('../database');


/* GET api for overview. */
router.get('/', function(req, res, next) {
  res.json(res.locals.hosts);
});

module.exports = router;