import db from '../config/db.js';

export const createTransfer = async ({ asset_id, from_base_id, to_base_id, quantity }) => {
  const [result] = await db.query(
    'INSERT INTO Transfers (asset_id, from_base_id, to_base_id, quantity) VALUES (?, ?, ?, ?)',
    [asset_id, from_base_id, to_base_id, quantity]
  );
  return result.insertId;
};

export const getAllTransfers = async () => {
  const [rows] = await db.query(`
    SELECT t.*, a.name AS asset_name, fb.name AS from_base, tb.name AS to_base
    FROM Transfers t
    JOIN Assets a ON t.asset_id = a.id
    JOIN Bases fb ON t.from_base_id = fb.id
    JOIN Bases tb ON t.to_base_id = tb.id
    ORDER BY t.date DESC
  `);
  return rows;
};

export const getTransferById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Transfers WHERE id = ?', [id]);
  return rows[0];
};
