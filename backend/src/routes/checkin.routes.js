import express from "express"
import { authenticateUser } from "../middlewares/user.middlware.js"
import { createCheckIn, getCheckInHistory } from "../controllers/checkin.controller.js"

const router = express.Router()

router.post("/habits/:habitId/check-ins", authenticateUser, createCheckIn)

router.get("/habits/:habitId/check-ins", authenticateUser, getCheckInHistory)

export default router