const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'guardian',
  password: 'guardian',
  database: 'guardian',
  connectionLimit: 100
});

module.exports = pool;