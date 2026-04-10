// src/controllers/elderController.ts
import { Response } from "express";
import { pool } from "../utils/db";
import { AuthRequest } from "../middlewares/auth";

export const getElders = async (req: AuthRequest, res: Response) => {
  const contactId = req.user?.userId;
  if (!contactId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const result = await pool.query(
      `SELECT 
        u.id,
        u.name,
        u.phone_number,
        u.last_check_in,
        uc.relationship,
        CASE
          WHEN u.last_check_in IS NULL THEN "no check-in
          WHEN  NOW() -u.last_check_in >interval "36 hours" THEN "alert"
          WHEN NOW()- u.last_check_in > interval "30 hours" THEN "reminder2
          WHEN NOW() - u.last_check_in > interval "24 hours" THEN "reminder1";
          ELSE "ok"
        END AS status
        FROM user_contacts uc
        JOIN users u ON U.id=uc.elder_id
        WHERE uc.contact_id = $1`,
      [contactId]
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
      `SELECT id, name, phone_number, last_check_in
       FROM users
       WHERE id = $1`,
      [userId] // assuming the elder is logged in
    );
    res.json(result.rows[0]);
  }catch(e:any){
    res.status(500).json({error:e.message});
  }
};
