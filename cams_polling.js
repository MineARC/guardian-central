var update_cams = function(db, cams) {
  db.query(
        'INSERT INTO cams_data VALUES ((SELECT name FROM guardians WHERE ip = ?), now(), ?, ?, ?)',
        [element.ip, cams.occupied, cams.solenoid, cams.rate])
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('error: ' + err);
      });
};

module.exports = update_cams;