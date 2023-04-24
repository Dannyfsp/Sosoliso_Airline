"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});
pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("Error executing query", err.stack);
    }
    else {
        console.log("Database Connected, Current timestamp:", res.rows[0].now);
    }
});
exports.default = pool;
