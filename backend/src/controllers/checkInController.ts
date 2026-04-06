// src/controllers/checkInController.ts
import { Response } from "express";
import { pool } from "../utils/db";
import { AuthRequest } from "../middlewares/auth";
import {io} from "../utils/socket";

// helper. check same day
const isSameDay=(date1:Date, date2:Date)=>{
  return(
    date1.getFullYear()===date2.getFullYear()&&
    date1.getMonth()===date2.getMonth()&&
    date1.getDate()===date2.getDate()
  );
};


//  Create check-in 1 per day

export const createCheckIn = async (req: AuthRequest, res: Response) => {
  const user_id = req.user?.userId;

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // get last check-in
    const userResult = await pool.query(
      `SELECT last_check_in FROM users WHERE id = $1`,
      [user_id]
    );
    const lastCheckIn = userResult.rows[0]?.last_check_in;
    // no multiple check-in per day
    if(lastCheckIn && isSameDay(new Date(lastCheckIn), new Date())){
      return res.status(400).json({
        error:"You have already checked in today",
        last_check_in:lastCheckIn
      })
    }

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

    const updatedTime=userUpdate.rows[0].last_check_in;
    // real time update to elder and contacts
    if(io){
      // update elder dashboard
      io.to(`user-${user_id}`).emit("checkin_update", {
        last_check_in: updatedTime
      });

      // update all contact dashboards
      const contacts=await pool.query(
        `SELECT contact_id FROM user_contacts WHERE elder_id=$1`,
        [user_id]
      );
      for(const c of contacts.rows){
        io.to(`user-${c.contact_id}`).emit("checkin_update", {
          elder_id:user_id,
          last_check_in:updatedTime,
        });
      }
    }

    res.json({
      message: "Check-in successful",
      last_check_in:updatedTime,
    });
  } catch(e:any){
    res.status(500).json({error:e.message});
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
    const lastCheckIn=result.rows[0]?.last_check_in;

    let checkedToday=false;
    if(lastCheckIn){
      checkedToday=isSameDay(new Date(lastCheckIn), new Date());
    }
    res.json({
      last_check_in:lastCheckIn||null,
      checked_today:checkedToday,
    });
  } catch(e:any){
    res.status(500).json({error:e.message});
  }
};
  