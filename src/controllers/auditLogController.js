import { getAllAuditLogs, getAuditLogsByUser } from '../models/auditLogModel.js';

export const fetchAllLogs = async (req, res) => {
  try {
    const logs = await getAllAuditLogs();
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch audit logs', error: err.message });
  }
};

export const fetchUserLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const logs = await getAuditLogsByUser(userId);
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your audit logs', error: err.message });
  }
};
