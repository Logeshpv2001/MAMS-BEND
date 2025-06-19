import {
  getAllAssets,
  getAssetById,
  createAsset,
} from "../models/assetModel.js";
import db from "../config/db.js";

export const fetchAllAssets = async (req, res) => {
  try {
    const assets = await getAllAssets();
    res.status(200).json(assets);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching assets", error: err.message });
  }
};

export const fetchAssetById = async (req, res) => {
  try {
    const asset = await getAssetById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.status(200).json(asset);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching asset", error: err.message });
  }
};

export const addAsset = async (req, res) => {
  try {
    const { name, type, total_qty } = req.body;
    const id = await createAsset(name, type, total_qty || 0);
    res.status(201).json({ id, name, type, total_qty: total_qty || 0 });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating asset", error: err.message });
  }
};

export const getAssetSummary = async (req, res) => {
  try {
    const [openingRes] = await db.query(
      `SELECT SUM(total_qty) AS opening_balance FROM Assets`
    );

    const [purchasesRes] = await db.query(
      `SELECT SUM(quantity) AS purchases FROM Purchases`
    );

    const [transfersInRes] = await db.query(
      `SELECT SUM(quantity) AS transfers_in FROM Transfers`
    );
    const [transfersOutRes] = await db.query(
      `SELECT SUM(quantity) AS transfers_out FROM Transfers`
    );

    const [assignedRes] = await db.query(`
      SELECT SUM(quantity) AS assigned
      FROM Assignments
      WHERE status = 'assigned'
    `);

    const [expendedRes] = await db.query(`
      SELECT SUM(quantity) AS expended
      FROM Assignments
      WHERE status = 'expended'
    `);

    const opening = openingRes[0]?.opening_balance || 0;
    const purchases = purchasesRes[0]?.purchases || 0;
    const transfersIn = transfersInRes[0]?.transfers_in || 0;
    const transfersOut = transfersOutRes[0]?.transfers_out || 0;
    const assigned = assignedRes[0]?.assigned || 0;
    const expended = expendedRes[0]?.expended || 0;

    const netMovement = purchases + transfersIn - transfersOut;
    const closingBalance = opening + netMovement - assigned - expended;

    return res.status(200).json({
      opening_balance: opening,
      purchases,
      transfers_in: transfersIn,
      transfers_out: transfersOut,
      net_movement: netMovement,
      assigned,
      expended,
      closing_balance: closingBalance,
    });
  } catch (err) {
    console.error("Error fetching asset summary:", err);
    return res
      .status(500)
      .json({ message: "Server error while fetching summary" });
  }
};
