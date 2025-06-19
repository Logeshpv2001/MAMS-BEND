import db from "../config/db.js";

export const createAssignment = async (assignment) => {
  const {
    asset_id,
    personnel_name,
    base_id,
    quantity,
    status = "assigned",
  } = assignment;
  const [result] = await db.query(
    `INSERT INTO Assignments (asset_id, personnel_name, base_id, quantity, status)
     VALUES (?, ?, ?, ?, ?)`,
    [asset_id, personnel_name, base_id, quantity, status]
  );
  return result.insertId;
};

export const getAllAssignments = async () => {
  const [rows] = await db.query(
    `SELECT a.*, ass.name AS asset_name, b.name AS base_name
     FROM Assignments a
     JOIN Assets ass ON a.asset_id = ass.id
     JOIN Bases b ON a.base_id = b.id
     ORDER BY a.date DESC`
  );
  return rows;
};

export const getAssignmentById = async (id) => {
  const [rows] = await db.query("SELECT * FROM Assignments WHERE id = ?", [id]);
  return rows[0];
};

export const updateAssignmentStatus = async (id, status) => {
  await db.query("UPDATE Assignments SET status = ? WHERE id = ?", [
    status,
    id,
  ]);
};

export const deleteAssignment = async (id) => {
  await db.query("DELETE FROM Assignments WHERE id = ?", [id]);
};
