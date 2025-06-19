import {
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    updateAssignmentStatus,
    deleteAssignment
  } from '../models/assignmentModel.js';
  
  export const assignAsset = async (req, res) => {
    try {
      const id = await createAssignment(req.body);
      res.status(201).json({ message: 'Asset assigned successfully', id });
    } catch (err) {
      res.status(500).json({ message: 'Failed to assign asset', error: err.message });
    }
  };
  
  export const fetchAssignments = async (req, res) => {
    try {
      const data = await getAllAssignments();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching assignments', error: err.message });
    }
  };
  
  export const fetchAssignmentById = async (req, res) => {
    try {
      const assignment = await getAssignmentById(req.params.id);
      if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
      res.status(200).json(assignment);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching assignment', error: err.message });
    }
  };
  
  export const updateStatus = async (req, res) => {
    try {
      const { status } = req.body;
      await updateAssignmentStatus(req.params.id, status);
      res.status(200).json({ message: 'Status updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update status', error: err.message });
    }
  };
  
  export const removeAssignment = async (req, res) => {
    try {
      await deleteAssignment(req.params.id);
      res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting assignment', error: err.message });
    }
  };
  