// src/controllers/elderController.ts
import { Response } from "express";
import { pool } from "../utils/db";
import { AuthRequest } from "../middlewares/auth";

export const getElders = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const result = await pool.query(
      `SELECT uc.elder_id, u.name, u.phone_number, uc.relationship
       FROM user_contacts uc
       JOIN users u ON u.id = uc.elder_id
       WHERE uc.contact_id = $1`,
      [userId]
    );
    res.json(result.rows);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};


export const getElderProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const result = await pool.query(
      `SELECT id, name, phone_number
       FROM users
       WHERE id = $1`,
      [userId] // assuming the elder is logged in
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Elder not found" });
    }

    res.json(result.rows[0]);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};