require('dotenv').config();
const Pool = require('pg').Pool;

 const connectionString = process.env.DB_CONNECTION;

const pool = new Pool({
    connectionString,
});

module.exports = pool;