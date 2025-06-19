import db from "../config/db.js";

const logAudit = async (userId, action, description) => {
  try {
    await db.query(
      "INSERT INTO AuditLogs (user_id, action, description, timestamp) VALUES (?, ?, ?, NOW())",
      [userId, action, description]
    );
  } catch (err) {
    console.error("Failed to log action:", err.message);
  }
};

export default logAudit;
