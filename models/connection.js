require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = {
    createConnection: async function() {
        try {
            const connection = await pool.getConnection(async conn => conn);
            await connection.beginTransaction();
            return connection;
        } catch (e) {
            console.log("connections.js: DB internal error");
            return false;
        }
    }
};
