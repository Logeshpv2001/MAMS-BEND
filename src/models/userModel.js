import db from "../config/db.js";
import bcrypt from "bcrypt";

export const createUser = async ({ name, email, password, role, base_id }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    "INSERT INTO Users (name, email, password, role, base_id) VALUES (?, ?, ?, ?, ?)",
    [name, email, hashedPassword, role, base_id]
  );
  return result.insertId;
};

export const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM Users WHERE id = ?", [id]);
  return rows[0];
};

export const getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM Users");
  return rows;
};

export const updateUser = async (id, data) => {
  const { name, email, role, base_id } = data;
  const [result] = await db.query(
    "UPDATE Users SET name = ?, email = ?, role = ?, base_id = ? WHERE id = ?",
    [name, email, role, base_id, id]
  );
  return result.affectedRows;
};
