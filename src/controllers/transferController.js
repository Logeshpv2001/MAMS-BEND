import {
  createTransfer,
  getAllTransfers,
  getTransferById,
} from "../models/transferModel.js";

import logAudit from "../utils/logger.js";

export const addTransfer = async (req, res) => {
  try {
    const { asset_id, from_base_id, to_base_id, quantity } = req.body;

    if (from_base_id === to_base_id) {
      return res
        .status(400)
        .json({ message: "Cannot transfer to the same base" });
    }

    const id = await createTransfer({
      asset_id,
      from_base_id,
      to_base_id,
      quantity,
    });

    await logAudit(
      req.user.id,
      "transfer_created",
      `Transferred asset ${asset_id} from base ${from_base_id} to ${to_base_id}, qty: ${quantity}`
    );

    res.status(201).json({ message: "Transfer recorded", id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error recording transfer", error: err.message });
  }
};

export const fetchAllTransfers = async (req, res) => {
  try {
    const transfers = await getAllTransfers();
    res.status(200).json(transfers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching transfers", error: err.message });
  }
};

export const fetchTransferById = async (req, res) => {
  try {
    const transfer = await getTransferById(req.params.id);
    if (!transfer)
      return res.status(404).json({ message: "Transfer not found" });
    res.status(200).json(transfer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching transfer", error: err.message });
  }
};
