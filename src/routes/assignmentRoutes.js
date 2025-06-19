import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  assignAsset,
  fetchAssignmentById,
  fetchAssignments,
  removeAssignment,
  updateStatus,
} from "../controllers/assignmentController.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const assignmentRoute = express.Router();

assignmentRoute.use(authenticateUser);

assignmentRoute.get(
  "/",
  authorizeRoles("admin", "logistics", "commander"),
  fetchAssignments
);

assignmentRoute.get(
  "/:id",
  authorizeRoles("admin", "logistics", "commander"),
  fetchAssignmentById
);

assignmentRoute.post("/", authorizeRoles("admin", "logistics"), assignAsset);

assignmentRoute.put(
  "/:id/status",
  authorizeRoles("admin", "logistics"),
  updateStatus
);

assignmentRoute.delete("/:id", authorizeRoles("admin"), removeAssignment);

export default assignmentRoute;
