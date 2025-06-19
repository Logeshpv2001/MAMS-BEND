import express from "express";
import Authrouter from "./authRoutes.js";
import userRouter from "./userRoutes.js";
import baseRouter from "./baseRoutes.js";
import assetRouter from "./assetRoutes.js";
import purchaseRouter from "./purchaseRputes.js";
import assignmentRoute from "./assignmentRoutes.js";
import auditLogRouter from "./auditLogRoutes.js";
import transferRouter from "./transferRoutes.js";

const router = express.Router();

router.use("/auth", Authrouter);
router.use("/user", userRouter);
router.use("/base", baseRouter);
router.use("/asset", assetRouter);
router.use("/purchase", purchaseRouter);
router.use("/transfer", transferRouter);
router.use("/assignment", assignmentRoute);
router.use("/audit-logs", auditLogRouter);

export default router;
