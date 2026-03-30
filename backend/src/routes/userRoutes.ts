import { Router } from "express";
import { signup, login } from "../controllers/userController";
import { addContact, addElder } from "../controllers/addContactsController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.post("/add-contact", authMiddleware, addContact);
router.post("/add-elder", authMiddleware, addElder);

export default router;