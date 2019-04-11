var update_cams = function(db, ip, cams) {
  db.getConnection()
      .then(conn => {
        conn.query('INSERT INTO cams_data (guardian, time, data) VALUES ((SELECT name FROM guardians WHERE ip = ?), now(), ?)',
                   [ ip, cams ])
            .then(console.log)
            .catch(console.log)
            .then(conn.end);
      })
      .catch(console.log);
};

module.exports = update_cams;