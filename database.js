"use strict";

const mariaDB = require("mariadb");

const pool = mariaDB.createPool({
    host: "localhost",
    user: "leo",
    password: "L33tP@ssw0rd",
    database: "gamedb",
    connectionLimit: 2
});

async function closePool() {
    try {
        await pool.end();
        console.log("Database connection pool closed.");
    } catch (error) {
        console.error("Error closing pool:", error);
    }
};


module.exports = { pool, closePool };