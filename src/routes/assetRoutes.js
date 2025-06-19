import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  addAsset,
  fetchAllAssets,
  fetchAssetById,
  getAssetSummary,
} from "../controllers/assetController.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const assetRouter = express.Router();

assetRouter.use(authenticateUser);

assetRouter.post("/add", authorizeRoles("admin"), addAsset);
assetRouter.get("/get-all", fetchAllAssets);
assetRouter.get("/get-asset-by/:id", fetchAssetById);
assetRouter.get("/summary", authenticateUser, getAssetSummary);

export default assetRouter;
