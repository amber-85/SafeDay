import { Router } from "express";
import { createCheckIn } from "../controllers/checkInController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Protected route — only logged-in users can check in
router.post("/", authMiddleware, createCheckIn);

export default router;