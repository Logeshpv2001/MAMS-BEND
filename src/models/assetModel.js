import db from '../config/db.js';

export const getAllAssets = async () => {
  const [rows] = await db.query('SELECT * FROM Assets');
  return rows;
};

export const getAssetById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Assets WHERE id = ?', [id]);
  return rows[0];
};

export const createAsset = async (name, type, total_qty) => {
  const [result] = await db.query(
    'INSERT INTO Assets (name, type, total_qty) VALUES (?, ?, ?)',
    [name, type, total_qty]
  );
  return result.insertId;
};
