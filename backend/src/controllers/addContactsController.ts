import { Response } from "express";
import { pool } from "../utils/db";
import { AuthRequest } from "../middlewares/auth";

/**
 * ==========================
 * ELDER CRUD FOR CONTACTS
 * ==========================
 */

/** Add a contact (placeholder created if not registered) */
export const addContact = async (req: AuthRequest, res: Response) => {
  const elder_id = req.user?.userId;
  if (!elder_id) return res.status(401).json({ error: "Unauthorized" });

  const { contact_phone, contact_name, relationship } = req.body;
  if (!contact_phone || !relationship)
    return res.status(400).json({ error: "Contact phone and relationship required" });

  try {
    let result = await pool.query(`SELECT id FROM users WHERE phone_number = $1`, [contact_phone]);
    let contact = result.rows[0];

    if (!contact) {
      result = await pool.query(
        `INSERT INTO users (phone_number, name) VALUES ($1, $2) RETURNING id`,
        [contact_phone, contact_name || null]
      );
      contact = result.rows[0];
    }

    await pool.query(
      `INSERT INTO user_contacts (elder_id, contact_id, relationship)
       VALUES ($1, $2, $3)
       ON CONFLICT DO NOTHING`,
      [elder_id, contact.id, relationship]
    );

    res.json({ message: "Contact added successfully", contact_id: contact.id });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

/** Edit a contact (name, phone, relationship) */
export const updateContact = async (req: AuthRequest, res: Response) => {
  const elder_id = req.user?.userId;
  if (!elder_id) return res.status(401).json({ error: "Unauthorized" });

  const { contact_id, contact_name, contact_phone, relationship } = req.body;
  if (!contact_id) return res.status(400).json({ error: "Contact ID required" });

  try {
    if (contact_name || contact_phone) {
      await pool.query(
        `UPDATE users
         SET name = COALESCE($1, name),
             phone_number = COALESCE($2, phone_number)
         WHERE id = $3`,
        [contact_name || null, contact_phone || null, contact_id]
      );
    }

    if (relationship) {
      await pool.query(
        `UPDATE user_contacts
         SET relationship = $1
         WHERE elder_id = $2 AND contact_id = $3`,
        [relationship, elder_id, contact_id]
      );
    }

    res.json({ message: "Contact updated successfully" });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

/** Delete a contact */
export const deleteContact = async (req: AuthRequest, res: Response) => {
  const elder_id = req.user?.userId;
  if (!elder_id) return res.status(401).json({ error: "Unauthorized" });

  const { contact_id } = req.body;
  if (!contact_id) return res.status(400).json({ error: "Contact ID required" });

  try {
    await pool.query(`DELETE FROM user_contacts WHERE elder_id = $1 AND contact_id = $2`, [
      elder_id,
      contact_id,
    ]);
    res.json({ message: "Contact deleted successfully" });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

/**
 * ==========================
 * CONTACT CRUD FOR ELDERS
 * ==========================
 */

/** Add an elder (placeholder created if not registered) */
export const addElder = async (req: AuthRequest, res: Response) => {
  const contact_id = req.user?.userId;
  if (!contact_id) return res.status(401).json({ error: "Unauthorized" });

  const { elder_phone, elder_name, relationship } = req.body;
  if (!elder_phone || !relationship)
    return res.status(400).json({ error: "Elder phone and relationship required" });

  try {
    let result = await pool.query(`SELECT id FROM users WHERE phone_number = $1`, [elder_phone]);
    let elder = result.rows[0];

    if (!elder) {
      result = await pool.query(
        `INSERT INTO users (phone_number, name) VALUES ($1, $2) RETURNING id`,
        [elder_phone, elder_name || null]
      );
      elder = result.rows[0];
    }

    await pool.query(
      `INSERT INTO user_contacts (elder_id, contact_id, relationship)
       VALUES ($1, $2, $3)
       ON CONFLICT DO NOTHING`,
      [elder.id, contact_id, relationship]
    );

    res.json({ message: "Elder added successfully", elder_id: elder.id });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

/** Edit an elder (name, phone, relationship) */
export const updateElder = async (req: AuthRequest, res: Response) => {
  const contact_id = req.user?.userId;
  if (!contact_id) return res.status(401).json({ error: "Unauthorized" });

  const { elder_id, elder_name, elder_phone, relationship } = req.body;
  if (!elder_id) return res.status(400).json({ error: "Elder ID required" });

  try {
    if (elder_name || elder_phone) {
      await pool.query(
        `UPDATE users
         SET name = COALESCE($1, name),
             phone_number = COALESCE($2, phone_number)
         WHERE id = $3`,
        [elder_name || null, elder_phone || null, elder_id]
      );
    }

    if (relationship) {
      await pool.query(
        `UPDATE user_contacts
         SET relationship = $1
         WHERE elder_id = $2 AND contact_id = $3`,
        [relationship, elder_id, contact_id]
      );
    }

    res.json({ message: "Elder updated successfully" });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

/** Delete an elder */
export const deleteElder = async (req: AuthRequest, res: Response) => {
  const contact_id = req.user?.userId;
  if (!contact_id) return res.status(401).json({ error: "Unauthorized" });

  const { elder_id } = req.body;
  if (!elder_id) return res.status(400).json({ error: "Elder ID required" });

  try {
    await pool.query(`DELETE FROM user_contacts WHERE elder_id = $1 AND contact_id = $2`, [
      elder_id,
      contact_id,
    ]);
    res.json({ message: "Elder deleted successfully" });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};