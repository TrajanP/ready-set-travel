const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Dasher11",
    host: "localhost",
    port: 5432,
    database: "traveldb",
});

module.exports = pool;

