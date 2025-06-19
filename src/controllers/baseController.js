import {
  getAllBases,
  getBaseById,
  createBase,
  updateBase,
  deleteBase,
} from "../models/baseModel.js";

export const fetchAllBases = async (req, res) => {
  try {
    const bases = await getAllBases();
    res.status(200).json(bases);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching bases", error: err.message });
  }
};

export const fetchBaseById = async (req, res) => {
  try {
    const base = await getBaseById(req.params.id);
    if (!base) return res.status(404).json({ message: "Base not found" });
    res.status(200).json(base);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching base", error: err.message });
  }
};

export const addBase = async (req, res) => {
  try {
    const { name, location } = req.body;
    const id = await createBase(name, location);
    res.status(201).json({ id, name, location });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating base", error: err.message });
  }
};

export const editBase = async (req, res) => {
  try {
    const { name, location } = req.body;
    await updateBase(req.params.id, name, location);
    res.status(200).json({ message: "Base updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating base", error: err.message });
  }
};

export const removeBase = async (req, res) => {
  try {
    await deleteBase(req.params.id);
    res.status(200).json({ message: "Base deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting base", error: err.message });
  }
};
