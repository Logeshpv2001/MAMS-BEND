import express from "express";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  getPurchases,
  recordPurchase,
} from "../controllers/purchaseController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const purchaseRouter = express.Router();

purchaseRouter.use(authenticateUser);

purchaseRouter.post(
  "/create",
  authorizeRoles("admin", "logistics"),
  recordPurchase
);

purchaseRouter.get("/get", getPurchases);

export default purchaseRouter;
