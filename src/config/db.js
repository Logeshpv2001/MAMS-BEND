import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("MySQL connected");
    conn.release();
  } catch (error) {
    console.error("MySQL connection failed:", error);
  }
})();

export default pool;
