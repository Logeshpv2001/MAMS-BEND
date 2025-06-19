import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  fetchAllLogs,
  fetchUserLogs,
} from "../controllers/auditLogController.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const auditLogRouter = express.Router();

auditLogRouter.use(authenticateUser);

auditLogRouter.get("/get-all", authorizeRoles("admin"), fetchAllLogs);

auditLogRouter.get("/get-user", fetchUserLogs);

export default auditLogRouter;
