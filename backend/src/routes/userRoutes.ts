import { Router } from "express";
import { signup, login } from "../controllers/userController";
import { addContact, addElder,getContacts } from "../controllers/addContactsController";
import {getElders} from "../controllers/elderController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.post("/add-contact", authMiddleware, addContact);
router.get("/contacts", authMiddleware, getContacts);

router.post("/add-elder", authMiddleware, addElder);
router.get("/elders", authMiddleware, getElders);

export default router;