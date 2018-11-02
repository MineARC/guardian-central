var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  var data = {};
  // data['alias'] = alias.alias;
  // data['localize'] = jumpers.localize;
  // if (jumpers.cams) data['cams'] = true;
  // if (jumpers.aura) data['aura'] = true;
  // if (jumpers.extn) data['extn'] = true;
  // data['elv'] = elv_polling.data;
  // data['hosts'] = hostdiscovery.hosts_data;
  res.render('elv', data);
});

module.exports = router;