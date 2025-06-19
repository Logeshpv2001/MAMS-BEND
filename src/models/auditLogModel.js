import db from '../config/db.js';

export const createAuditLog = async (user_id, action, description) => {
  await db.query(
    'INSERT INTO AuditLogs (user_id, action, description) VALUES (?, ?, ?)',
    [user_id, action, description]
  );
};

export const getAllAuditLogs = async () => {
  const [rows] = await db.query(`
    SELECT a.id, a.action, a.description, a.timestamp, u.name AS user_name, u.email 
    FROM AuditLogs a
    LEFT JOIN Users u ON a.user_id = u.id
    ORDER BY a.timestamp DESC
  `);
  return rows;
};

export const getAuditLogsByUser = async (user_id) => {
  const [rows] = await db.query(
    `SELECT * FROM AuditLogs WHERE user_id = ? ORDER BY timestamp DESC`,
    [user_id]
  );
  return rows;
};
