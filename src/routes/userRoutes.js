import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  createNewUser,
  deleteUser,
  listUsers,
  updateUserById,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  authenticateUser,
  authorizeRoles("admin"),
  createNewUser
);
userRouter.get("/get-users", listUsers);
userRouter.put(
  "/edit-user/:id",
  authenticateUser,
  authorizeRoles("admin"),
  updateUserById
);

userRouter.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  deleteUser
);

export default userRouter;
