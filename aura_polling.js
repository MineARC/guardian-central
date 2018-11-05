var update_aura = function(db, ip, aura) {
  db.query(
        'INSERT INTO aura_data (guardian, time, data) VALUES ((SELECT name FROM guardians WHERE ip = ?), now(), ?)',
        [ip, aura])
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('error: ' + err);
      });
};

module.exports = update_aura;