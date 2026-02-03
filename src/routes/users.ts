import express from "express";
import { dbUser } from "../db";
import { auth, requireRole, AuthRequest } from "../middleware/auth";

const router = express.Router();

// GET /users – csak admin láthat minden usert
router.get("/", auth, requireRole("admin"), (req: AuthRequest, res) => {
  const users = dbUser.prepare("SELECT id, username, email, role FROM users").all();
  res.json(users);
});

// GET /users/:id – minden user megnézheti a saját adatait
router.get("/:id", auth, (req: AuthRequest, res) => {
  const id = Number(req.params.id);

  // ha nem admin és nem a saját id-je → Forbidden
  if (req.user?.role !== "admin" && req.user?.id !== id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const user = dbUser.prepare("SELECT id, username, email, role FROM users WHERE id=?").get(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
});

export default router;
