var nmap = require('libnmap');
var request = require('request');
var os = require('os');
var v6 = require('ip-address').Address6;
var exports = module.exports;

var db = require('./database');

// Define object for access from where they are needed
exports.hosts_data = [];

setInterval(poll_database, 20000);
poll_database();

function poll_database() {
  db.getRecentGuardians(function(err, data) {
    if (err) {
      return console.log(err.message);
    }
    exports.hosts_data = data;
  });
}

setInterval(poll_hosts, 10000);
poll_hosts();

function poll_hosts() {
  hosts.forEach(function(element) {
    // Form a request for the guardian overview api endpoint
    var request_options = {
      url: 'http://' + element.ip + '/api/overview',
      proxy: ''
    };

    request.get(request_options, function(err, res, body) {
      try {
        if (!err && res.statusCode == 200) {
          api_res = JSON.parse(body);
          // Check to see if the api response came from a guardian system
          if (api_res.guardian) {
            // Everything but the ip address comes from the api
            api_res['ip'] = element.ip;
            db.addGuardian(api_res.hostname, api_res, function(err, changes) {
              if (err) {
                console.log(err.message);
              }
            });
          }
        }
      } catch (e) {
      }
    });
  });
};