import { createPurchase, getAllPurchases } from '../models/purchaseModel.js';

export const recordPurchase = async (req, res) => {
  console.log("Decoded User Info:", req.user);
  try {
    const { asset_id, base_id, quantity, date } = req.body;

    if (!asset_id || !base_id || !quantity || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const id = await createPurchase({ asset_id, base_id, quantity, date });

    res.status(201).json({ message: 'Purchase recorded', purchase_id: id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to record purchase', error: err.message });
  }
};

export const getPurchases = async (req, res) => {
  try {
    const { date, asset_id, base_id } = req.query;

    const purchases = await getAllPurchases({ date, asset_id, base_id });

    res.status(200).json(purchases);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch purchases', error: err.message });
  }
};
