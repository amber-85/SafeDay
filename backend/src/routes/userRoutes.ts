import { Router } from "express";
import { signup, login } from "../controllers/userController";
import { addContact, addElder,getContacts,updateContact,deleteContact,updateElder,deleteElder } from "../controllers/addContactsController";
import {getElders,getElderProfile} from "../controllers/elderController";
import { authMiddleware } from "../middlewares/auth";
import { authorizeRole } from "../middlewares/authorize";

const router = Router();

// Public routes
router.post("/auth/signup", signup);
router.post("/auth/login", login);

// contacts routes
router.post("/me/elders", authMiddleware, authorizeRole(["contact"]), addElder);
router.get("/me/elders", authMiddleware, authorizeRole(["contact"]), getElders);
router.put("/me/elders/:elderId", authMiddleware, authorizeRole(["contact"]), updateElder);
router.delete("/me/elders/:elderId", authMiddleware, authorizeRole(["contact"]), deleteElder);

// elder-specific routes, add contact, get contacts.
router.post("/me/contacts", authMiddleware, authorizeRole(["elder"]),addContact);
router.get("/me/contacts", authMiddleware, authorizeRole(["elder"]), getContacts);
router.put("/me/contacts/:contactId", authMiddleware, authorizeRole(["elder"]), updateContact);
router.delete("/me/contacts/:contactId", authMiddleware, authorizeRole(["elder"]), deleteContact);
router.put("/me/elders/:elderId", authMiddleware, authorizeRole(["contact"]), updateElder);
router.delete("/me/elders/:elderId", authMiddleware, authorizeRole(["contact"]), deleteElder);
router.get ("/me/profile", authMiddleware, authorizeRole(["elder"]), getElderProfile);

export default router;