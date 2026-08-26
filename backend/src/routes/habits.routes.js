import express from "express";
import { authenticateUser } from "../middlewares/user.middlware.js";
import {
  createHabit,
  deleteHabit,
  getHabitById,
  getHabits,
  updateHabit,
} from "../controllers/habits.controller.js";

const router = express.Router();

router.post("/", authenticateUser, createHabit);

router.get("/", authenticateUser, getHabits);

router.patch("/:habitId", authenticateUser, updateHabit);

router.delete("/:habitId", authenticateUser, deleteHabit);

router.get("/:habitId", authenticateUser, getHabitById);

export default router;
