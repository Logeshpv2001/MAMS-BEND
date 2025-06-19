import express, { Router } from "express";
import {
  addBase,
  editBase,
  fetchAllBases,
  fetchBaseById,
  removeBase,
} from "../controllers/baseController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const baseRouter = express.Router();

baseRouter.use(authenticateUser);

baseRouter.post("/create", authorizeRoles("admin"), addBase);
baseRouter.get("/get-all-base", fetchAllBases);
baseRouter.get("/get-base-by/:id", fetchBaseById);
baseRouter.put("/edit/:id", authorizeRoles("admin"), editBase);
baseRouter.delete("/delete/:id", authorizeRoles("admin"), removeBase);

export default baseRouter;
