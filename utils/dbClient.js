const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function executeQuery(sql, params) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    const result = await connection.execute(sql, params);
    await connection.end();
    return result;
}

module.exports = { executeQuery };
