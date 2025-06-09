const util = require("util");
require("dotenv").config();
const mysql = require("mysql2");

// Log toàn bộ biến môi trường liên quan đến DB
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS ? "***HIDDEN***" : "NOT FOUND"); // Ẩn password để bảo mật
console.log("DB_NAME:", process.env.DB_NAME);

// Tạo connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,   // tối đa 10 kết nối đồng thời
    queueLimit: 0
});

// Promisify pool.query để dùng async/await
pool.query = util.promisify(pool.query);

console.log("MySQL Pool created");

module.exports = pool;
