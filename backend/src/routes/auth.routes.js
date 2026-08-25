import express from "express";
import { getMe, login, logout, register } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/user.middlware.js";

const router = express.Router()

router.post("/register", register)

router.post("/login", login)

router.get("/logout", authenticateUser, logout)

router.get("/me", authenticateUser, getMe)

export default router