const mariadb = require('mariadb');
const pool =
    mariadb.createPool({host : 'localhost', user : 'guardian', password : 'guardian', database : 'guardian', connectionLimit : 100});

module.exports = pool;

setInterval(cleanup, 60000);

function cleanup() {
  pool.getConnection()
      .then(conn => { conn.query('DELETE FROM aura_data WHERE time <= NOW() - INTERVAL 7 DAY').catch(console.log).then(conn.end); })
      .catch(console.log);

  pool.getConnection()
      .then(conn => { conn.query('DELETE FROM battmon_data WHERE time <= NOW() - INTERVAL 7 DAY').catch(console.log).then(conn.end); })
      .catch(console.log);

  pool.getConnection()
      .then(conn => { conn.query('DELETE FROM cams_data WHERE time <= NOW() - INTERVAL 7 DAY').catch(console.log).then(conn.end); })
      .catch(console.log);

  pool.getConnection()
      .then(conn => { conn.query('DELETE FROM elv_data WHERE time <= NOW() - INTERVAL 7 DAY').catch(console.log).then(conn.end); })
      .catch(console.log);

  pool.getConnection()
      .then(conn => { conn.query('DELETE FROM elvp_data WHERE time <= NOW() - INTERVAL 7 DAY').catch(console.log).then(conn.end); })
      .catch(console.log);

  pool.getConnection()
      .then(conn => { conn.query('DELETE FROM s3_data WHERE time <= NOW() - INTERVAL 7 DAY').catch(console.log).then(conn.end); })
      .catch(console.log);

  pool.getConnection()
      .then(conn => { conn.query('DELETE FROM s4_data WHERE time <= NOW() - INTERVAL 7 DAY').catch(console.log).then(conn.end); })
      .catch(console.log);
}