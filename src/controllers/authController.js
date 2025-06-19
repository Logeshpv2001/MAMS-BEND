import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      base_id: user.base_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role, base_id } = req.body;

    const existing = await findUserByEmail(email);
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const userId = await createUser({ name, email, password, role, base_id });
    const user = await findUserById(userId);
    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user);
    const safeUser = await findUserById(user.id);

    res.status(200).json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const logout = async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
