export type Role = "user" | "admin";

export interface User {
  id: number;
  username: string;
  email?: string;
  password: string; // hash-elve
  role: Role;
}

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  mileage: number;
}

// kiegészített request JWT user-rel
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: Pick<User, "id" | "username" | "role" | "email">;
}
