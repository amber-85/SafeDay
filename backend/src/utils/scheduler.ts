import cron from "node-cron";
import { pool } from "./db";
import { io } from "./socket";

// =========================
// Utils
// =========================
const hoursSince = (date: Date | null): number => {
  if (!date) return Infinity;

  const now = Date.now();
  const past = new Date(date).getTime();

  return (now - past) / (1000 * 60 * 60);
};

// =========================
// Create Notification
// =========================
const createNotification = async (
  userId: string,
  type: "reminder1" | "reminder2" | "alert",
  message: string
) => {
  const result = await pool.query(
    `INSERT INTO notifications (user_id, type, message)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, type, message]
  );

  const notification = result.rows[0];

  // ✅ real-time push
  if (io) {
    io.to(`user-${userId}`).emit("notification", notification);
  }

  return notification;
};

// =========================
// Scheduler Logic
// =========================
const checkMissedCheckIns = async () => {
  try {
    console.log("Running check-in monitor...");

    // ✅ optimized query
    const result = await pool.query(
      `SELECT * FROM users
       WHERE role = 'elder'
       AND last_check_in IS NOT NULL
       AND (
         reminder1_sent = FALSE OR
         reminder2_sent = FALSE OR
         alert_sent = FALSE
       )`
    );

    for (const user of result.rows) {
      const hours = hoursSince(user.last_check_in);

      console.log(
        `${user.name} → ${hours.toFixed(1)}h since last check-in`
      );

      // =========================
      // 🚨 ALERT (36h)
      // =========================
      if (hours >= 36 && !user.alert_sent) {
        const update = await pool.query(
          `UPDATE users
           SET alert_sent = TRUE
           WHERE id = $1 AND alert_sent = FALSE
           RETURNING *`,
          [user.id]
        );

        if (update.rowCount === 0) continue;

        const contacts = await pool.query(
          `SELECT u.id, u.name
           FROM user_contacts uc
           JOIN users u ON u.id = uc.contact_id
           WHERE uc.elder_id = $1`,
          [user.id]
        );

        for (const contact of contacts.rows) {
          await createNotification(
            contact.id,
            "alert",
            `⚠️ ${user.name} hasn't checked in for 36 hours.`
          );
        }

        // optional: notify elder
        await createNotification(
          user.id,
          "alert",
          "You have missed your check-in. Please check in immediately."
        );
      }

      // =========================
      // ⏰ REMINDER 2 (30h)
      // =========================
      else if (hours >= 30 && !user.reminder2_sent) {
        const update = await pool.query(
          `UPDATE users
           SET reminder2_sent = TRUE
           WHERE id = $1 AND reminder2_sent = FALSE
           RETURNING *`,
          [user.id]
        );

        if (update.rowCount === 0) continue;

        await createNotification(
          user.id,
          "reminder2",
          "⏰ Reminder: Please check in now."
        );
      }

      // =========================
      // ⏰ REMINDER 1 (24h)
      // =========================
      else if (hours >= 24 && !user.reminder1_sent) {
        const update = await pool.query(
          `UPDATE users
           SET reminder1_sent = TRUE
           WHERE id = $1 AND reminder1_sent = FALSE
           RETURNING *`,
          [user.id]
        );

        if (update.rowCount === 0) continue;

        await createNotification(
          user.id,
          "reminder1",
          "⏰ Reminder: Don't forget to check in today."
        );
      }
    }
  } catch (e: any) {
    console.error("Scheduler error:", e.message);
  }
};

// =========================
// Cron Job
// =========================
cron.schedule("*/5 * * * *", checkMissedCheckIns);