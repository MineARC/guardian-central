var fs = require('fs');
var csv = require('csv');
var pool = require('./database');

if (!fs.existsSync('log'))
  fs.mkdirSync('log', '755');

write();
setInterval(write, 60000);

function write() {
  pool.getConnection()
      .then(conn => {
        conn.query('SELECT * FROM aura_data ORDER BY time DESC LIMIT 1')
            .then(result => {
              if (result[0]) {
                var log = [ {} ];
                log[0].guardian = result[0].guardian;
                log[0].datetime = result[0].time;
                log[0].data = result[0].data;

                var validJSON = false;
                try {
                  var data = JSON.parse(result[0].data);
                  validJSON = true;
                } catch (e) {
                  // JSON Error
                }

                if (validJSON) {
                  csv.stringify(log, (err, output) => {
                    fs.writeFile('log/data-aura.csv', output, {flag : 'a', mode : '644'}, err => {
                      if (err)
                        console.log(err);
                    });
                  });
                }
              }
            })
            .catch(console.log)
            .then(conn.end);
      })
      .catch(console.log);

  pool.getConnection()
      .then(conn => {
        conn.query('SELECT * FROM battmon_data ORDER BY time DESC LIMIT 1')
            .then(result => {
              if (result[0]) {

                var log = [ {} ];
                log[0].guardian = result[0].guardian;
                log[0].datetime = result[0].time;
                log[0].data = result[0].data;

                var validJSON = false;
                try {
                  var data = JSON.parse(result[0].data);
                  validJSON = true;
                } catch (e) {
                  // JSON Error
                }

                if (validJSON)
                  csv.stringify(log, (err, output) => {
                    fs.writeFile('log/data-battmon.csv', output, {flag : 'a', mode : '644'}, err => {
                      if (err)
                        console.log(err);
                    });
                  });
              }
            })
            .catch(console.log)
            .then(conn.end);
      })
      .catch(console.log);

  pool.getConnection()
      .then(conn => {
        conn.query('SELECT * FROM cams_data ORDER BY time DESC LIMIT 1')
            .then(result => {
              if (result[0]) {

                var log = [ {} ];
                log[0].guardian = result[0].guardian;
                log[0].datetime = result[0].time;
                log[0].data = result[0].data;

                var validJSON = false;
                try {
                  var data = JSON.parse(result[0].data);
                  validJSON = true;
                } catch (e) {
                  // JSON Error
                }

                if (validJSON)
                  csv.stringify(log, (err, output) => {
                    fs.writeFile('log/data-cams.csv', output, {flag : 'a', mode : '644'}, err => {
                      if (err)
                        console.log(err);
                    });
                  });
              }
            })
            .catch(console.log)
            .then(conn.end);
      })
      .catch(console.log);

  pool.getConnection()
      .then(conn => {
        conn.query('SELECT * FROM elv_data ORDER BY time DESC LIMIT 1')
            .then(result => {
              if (result[0]) {

                var log = [ {} ];
                log[0].guardian = result[0].guardian;
                log[0].datetime = result[0].time;
                log[0].data = result[0].data;

                var validJSON = false;
                try {
                  var data = JSON.parse(result[0].data);
                  validJSON = true;
                } catch (e) {
                  // JSON Error
                }

                if (validJSON)
                  csv.stringify(log, (err, output) => {
                    fs.writeFile('log/data-elv.csv', output, {flag : 'a', mode : '644'}, err => {
                      if (err)
                        console.log(err);
                    });
                  });
              }
            })
            .catch(console.log)
            .then(conn.end);
      })
      .catch(console.log);

  pool.getConnection()
      .then(conn => {
        conn.query('SELECT * FROM elvp_data ORDER BY time DESC LIMIT 1')
            .then(result => {
              if (result[0]) {

                var log = [ {} ];
                log[0].guardian = result[0].guardian;
                log[0].datetime = result[0].time;
                log[0].data = result[0].data;

                var validJSON = false;
                try {
                  var data = JSON.parse(result[0].data);
                  validJSON = true;
                } catch (e) {
                  // JSON Error
                }

                if (validJSON)
                  csv.stringify(log, (err, output) => {
                    fs.writeFile('log/data-elvp.csv', output, {flag : 'a', mode : '644'}, err => {
                      if (err)
                        console.log(err);
                    });
                  });
              }
            })
            .catch(console.log)
            .then(conn.end);
      })
      .catch(console.log);

  pool.getConnection()
      .then(conn => {
        conn.query('SELECT * FROM s3_data ORDER BY time DESC LIMIT 1')
            .then(result => {
              if (result[0]) {

                var log = [ {} ];
                log[0].guardian = result[0].guardian;
                log[0].datetime = result[0].time;
                log[0].data = result[0].data;

                var validJSON = false;
                try {
                  var data = JSON.parse(result[0].data);
                  validJSON = true;
                } catch (e) {
                  // JSON Error
                }

                if (validJSON)
                  csv.stringify(log, (err, output) => {
                    fs.writeFile('log/data-s3.csv', output, {flag : 'a', mode : '644'}, err => {
                      if (err)
                        console.log(err);
                    });
                  });
              }
            })
            .catch(console.log)
            .then(conn.end);
      })
      .catch(console.log);

  pool.getConnection()
      .then(conn => {
        conn.query('SELECT * FROM s4_data ORDER BY time DESC LIMIT 1')
            .then(result => {
              if (result[0]) {

                var log = [ {} ];
                log[0].guardian = result[0].guardian;
                log[0].datetime = result[0].time;
                log[0].data = result[0].data;

                var validJSON = false;
                try {
                  var data = JSON.parse(result[0].data);
                  validJSON = true;
                } catch (e) {
                  // JSON Error
                }

                if (validJSON)
                  csv.stringify(log, (err, output) => {
                    fs.writeFile('log/data-s4.csv', output, {flag : 'a', mode : '644'}, err => {
                      if (err)
                        console.log(err);
                    });
                  });
              }
            })
            .catch(console.log)
            .then(conn.end);
      })
      .catch(console.log);
}