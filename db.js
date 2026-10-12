const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: '172.17.0.1',
    database: 'BlueWatch',
    password: 'l',
    port: '5432'
});

module.exports = pool;