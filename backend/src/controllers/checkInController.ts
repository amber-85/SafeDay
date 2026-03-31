// src/controllers/checkInController.ts
import { Response } from "express";
import { pool } from "../utils/db";
import { AuthRequest } from "../middlewares/auth";

/**
 * Create a new check-in for the logged-in elder
 */
export const createCheckIn = async (req: AuthRequest, res: Response) => {
  const user_id = req.user?.userId;

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Insert new check-in
    const result = await pool.query(
      `INSERT INTO check_ins (user_id)
       VALUES ($1)
       RETURNING *`,
      [user_id]
    );

    // Update user's last_check_in and reset reminder flags
    const userUpdate = await pool.query(
      `UPDATE users
       SET last_check_in = NOW(),
           reminder1_sent = FALSE,
           reminder2_sent = FALSE,
           alert_sent = FALSE
       WHERE id = $1
       RETURNING last_check_in`,
      [user_id]
    );

    // Return updated last_check_in for frontend
    res.json({
      message: "Check-in successful",
      last_check_in: userUpdate.rows[0].last_check_in,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

/**
 * Get the last check-in timestamp for the logged-in elder
 */
export const getLastCheckIn = async (req: AuthRequest, res: Response) => {
  const user_id = req.user?.userId;

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const result = await pool.query(
      `SELECT last_check_in FROM users WHERE id = $1`,
      [user_id]
    );

    res.json({
      last_check_in: result.rows[0]?.last_check_in || null,
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};