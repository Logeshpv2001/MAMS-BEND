import express from "express";
import { register, login, logout } from "../controllers/authController.js";

const Authrouter = express.Router();

Authrouter.post("/register", register);

Authrouter.post("/login", login);

Authrouter.post("/logout", logout);

export default Authrouter;
