import { Router } from "express";
import { createCheckIn } from "../controllers/checkInController";
import { authMiddleware } from "../middlewares/auth";
import { getLastCheckIn } from "../controllers/checkInController";
import { get } from "node:http";

const router = Router();

// Protected route — only logged-in users can check in
router.post("/", authMiddleware, createCheckIn);
router.get("/last", authMiddleware, getLastCheckIn);

export default router;