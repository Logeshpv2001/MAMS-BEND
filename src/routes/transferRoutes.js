import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  addTransfer,
  fetchAllTransfers,
  fetchTransferById,
} from "../controllers/transferController.js";

const transferRouter = express.Router();

transferRouter.use(authenticateUser);

transferRouter.get(
  "/get-all",
  authorizeRoles("admin", "commander", "logistics"),
  fetchAllTransfers
);

transferRouter.get(
  "/get-by/:id",
  authorizeRoles("admin", "commander", "logistics"),
  fetchTransferById
);

transferRouter.post(
  "/create",
  authorizeRoles("admin", "logistics"),
  addTransfer
);

export default transferRouter;
