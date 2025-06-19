import db from '../config/db.js';

export const createPurchase = async ({ asset_id, base_id, quantity, date }) => {
  const [result] = await db.query(
    'INSERT INTO Purchases (asset_id, base_id, quantity, date) VALUES (?, ?, ?, ?)',
    [asset_id, base_id, quantity, date]
  );
  return result.insertId;
};

export const getAllPurchases = async (filters = {}) => {
  const { date, asset_id, base_id } = filters;

  let query = 'SELECT * FROM Purchases WHERE 1=1';
  const params = [];

  if (date) {
    query += ' AND date = ?';
    params.push(date);
  }

  if (asset_id) {
    query += ' AND asset_id = ?';
    params.push(asset_id);
  }

  if (base_id) {
    query += ' AND base_id = ?';
    params.push(base_id);
  }

  const [rows] = await db.query(query, params);
  return rows;
};
