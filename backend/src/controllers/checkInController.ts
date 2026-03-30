import { Response } from "express";
import { pool } from "../utils/db";
import { AuthRequest } from "../middlewares/auth";

export const createCheckIn = async (req: AuthRequest, res: Response) => {
  const user_id = req.user?.userId;

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO check_ins (user_id)
       VALUES ($1)
       RETURNING *`,
      [user_id]
    );

    // reset reminder flags
    await pool.query(
      `UPDATE users 
       SET last_check_in = NOW(),
           reminder1_sent = FALSE,
           reminder2_sent = FALSE,
           alert_sent = FALSE
       WHERE id = $1`,
      [user_id]
    );

    res.json({
      message: "Check-in successful",
      checkin: result.rows[0],
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};