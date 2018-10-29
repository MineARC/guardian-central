const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'guardian',
  password: 'guardian',
  database: 'guardian',
  connectionLimit: 4
});

module.exports = pool;