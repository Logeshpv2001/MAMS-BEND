import {
  createUser,
  getAllUsers,
  findUserById,
  updateUser,
} from "../models/userModel.js";
import logAction from "../utils/logger.js";

export const createNewUser = async (req, res) => {
  try {
    const { name, email, password, role, base_id } = req.body;

    const id = await createUser({ name, email, password, role, base_id });
    await logAction(req.user.id, "CREATE_USER", `User ${email} created`);

    res.status(201).json({ message: "User created", userId: id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: err.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const updated = await updateUser(userId, req.body);
    console.log(updated);

    if (!updated) return res.status(404).json({ message: "User not found" });

    await logAction(req.user.id, "UPDATE_USER", `User ID ${userId} updated`);
    res.status(200).json({ message: "User updated" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: err.message });
  }
};
