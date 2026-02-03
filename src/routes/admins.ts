import express from "express";
import { dbUser } from "../db";
import { auth, requireRole, AuthRequest } from "../middleware/auth";

const router = express.Router();

// GET /admins – csak adminok
router.get("/", auth, requireRole("admin"), (req: AuthRequest, res) => {
  const admins = dbUser.prepare("SELECT id, username, email FROM users WHERE role='admin'").all();
  res.json(admins);
});

export default router;
