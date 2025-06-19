import db from "../config/db.js";

export const getAllBases = async () => {
  const [rows] = await db.query("SELECT * FROM Bases");
  return rows;
};

export const getBaseById = async (id) => {
  const [rows] = await db.query("SELECT * FROM Bases WHERE id = ?", [id]);
  return rows[0];
};

export const createBase = async (name, location) => {
  const [result] = await db.query(
    "INSERT INTO Bases (name, location) VALUES (?, ?)",
    [name, location]
  );
  return result.insertId;
};

export const updateBase = async (id, name, location) => {
  await db.query("UPDATE Bases SET name = ?, location = ? WHERE id = ?", [
    name,
    location,
    id,
  ]);
};

export const deleteBase = async (id) => {
  await db.query("DELETE FROM Bases WHERE id = ?", [id]);
};
