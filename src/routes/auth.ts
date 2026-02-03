import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbUser } from "../db";
import { Role } from "../types";

const router = express.Router();
const SECRET = "titkos_kulcs";

// REGISTER
router.post("/register", (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: "Missing fields" });

  const userRole: Role = role === "admin" ? "admin" : "user";
  const hashed = bcrypt.hashSync(password, 10);

  try {
    dbUser.prepare(`
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `).run(username, email, hashed, userRole);

    res.json({ success: true });
  } catch {
    res.status(400).json({ error: "Username or email already exists" });
  }
});

// LOGIN
router.post("/login", (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) return res.status(400).json({ error: "Missing fields" });

  const user = dbUser.prepare("SELECT * FROM users WHERE username=? OR email=?").get(login, login);

  if (!user) return res.status(400).json({ error: "User not found" });
  if (!bcrypt.compareSync(password, user.password)) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET, { expiresIn: "7d" });

  res.json({ token });
});

export default router;
