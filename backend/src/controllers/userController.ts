import { Request, Response } from "express";
import { pool } from "../utils/db";
import bcrypt from "bcrypt";
import { normalizePhoneNumber } from "../utils/phone";
import { generateToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  const { phone_number, name, password } = req.body;

  if (!phone_number || !password) {
    return res.status(400).json({ error: "Phone number and password are required" });
  }

  const normalizedPhone = normalizePhoneNumber(phone_number);
  if (!normalizedPhone) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  try {
    // 1. Check if user already exists
    const existingResult = await pool.query(
      `SELECT * FROM users WHERE phone_number = $1`,
      [normalizedPhone]
    );
    const existingUser = existingResult.rows[0];

    if (existingUser) {
      // Case: placeholder exists (no password_hash)
      if (!existingUser.password_hash) {
        const hashed = await bcrypt.hash(password, 10);
        const updated = await pool.query(
          `UPDATE users SET password_hash = $1, name = COALESCE($2, name)
           WHERE id = $3 RETURNING *`,
          [hashed, name || null, existingUser.id]
        );
        const user = updated.rows[0];
        const token = generateToken(user.id);
        const { password_hash, ...safeUser } = user;
        return res.json({ user: safeUser, token });
      }

      // Case: user already fully registered
      return res.status(400).json({ error: "User already exists" });
    }

    // 2. Create new user
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users(phone_number, name, password_hash)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [normalizedPhone, name || null, hashed]
    );
    const user = result.rows[0];
    const token = generateToken(user.id);
    const { password_hash, ...safeUser } = user;

    res.status(201).json({ user: safeUser, token });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { phone_number, password } = req.body;

  if (!phone_number || !password) {
    return res.status(400).json({ error: "Phone number and password are required" });
  }

  const normalizedPhone = normalizePhoneNumber(phone_number);
  if (!normalizedPhone) {
    return res.status(400).json({ error: "Invalid phone number" });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE phone_number = $1`,
      [normalizedPhone]
    );

    const user = result.rows[0];
    if (!user || !user.password_hash) {
      // If placeholder or non-existent user
      return res.status(404).json({ error: "User not found or not registered yet" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: "Wrong password" });

    const token = generateToken(user.id);
    const { password_hash, ...safeUser } = user;

    res.json({ user: safeUser, token });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};