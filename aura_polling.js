var update_aura = function(db, ip, aura) {
  db.getConnection()
      .then(conn => {
        conn.query('INSERT INTO aura_data (guardian, time, data) VALUES ((SELECT name FROM guardians WHERE ip = ?), now(), ?)',
                   [ ip, aura ])
            .then(console.log)
            .catch(console.log)
            .then(conn.release);
      })
      .catch(console.log);
};

module.exports = update_aura;