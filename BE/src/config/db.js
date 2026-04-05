const mysql = require("mysql2/promise");
require("dotenv").config; // .env 파일 읽어오기

// DB 연결 '풀(Pool)' 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER, // 본인의 MySQL 아이디
  password: process.env.DB_PASSWORD, // 본인의 MySQL 비밀번호
  database: process.env.DB_NAME || "ansim_db", // 생성한 DB 이름
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
