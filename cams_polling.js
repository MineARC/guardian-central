var update_cams = function(db, ip, cams) {
  db.query(
        'INSERT INTO cams_data (guardian, time, data) VALUES ((SELECT name FROM guardians WHERE ip = ?), now(), ?)',
        [ip, cams /*cams.occupied, cams.solenoid, cams.rate*/])
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('error: ' + err);
      });
};

module.exports = update_cams;