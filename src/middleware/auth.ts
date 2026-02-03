import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, Role } from "../types"; // már importált típusok

const SECRET = process.env.JWT_SECRET || "titkos_kulcs";

// ---------------- JWT ellenőrzés ----------------
export function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "No token" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET) as {
      id: number;
      username: string;
      role: Role;
      email?: string;
    };
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
}

// ---------------- Role alapú ellenőrzés ----------------
export function requireRole(role: Role) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "No user" });
    if (req.user.role !== role) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}

// ---------------- Több role támogatása ----------------
export function requireRoles(roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "No user" });
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}

// ---------------- /me endpoint helper ----------------
export function getCurrentUser(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  const { id, username, email, role } = req.user;
  res.json({ id, username, email, role });
}

// ---------------- JWT generálás ----------------
export function generateToken(user: { id: number; username: string; role: Role; email?: string }) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, email: user.email },
    SECRET,
    { expiresIn: "1h" }
  );
}

// ---------------- Export típusok ----------------
export type { AuthRequest };
