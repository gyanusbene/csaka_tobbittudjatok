import express from "express";
import { dbCars } from "../db";
import { auth, requireRole, AuthRequest } from "../middleware/auth";

const router = express.Router();

// GET cars – mindenki láthatja (auth kell)
router.get("/", auth, (req: AuthRequest, res) => {
  const cars = dbCars.prepare("SELECT * FROM cars").all();
  res.json(cars);
});

// POST add car – csak admin
router.post("/add", auth, requireRole("admin"), (req: AuthRequest, res) => {
  const {
    brand,
    model,
    year,
    body,
    mileage,
    color,
    priceFT,
    fuel,
    gearbox,
    drive,
    accel,
    torque,
    power,
    doors,
    seats
  } = req.body;

  // Missing fields check
  const fields = [brand, model, year, body, mileage, color, priceFT, fuel, gearbox, drive, accel, torque, power, doors, seats];
  if (fields.some(f => f === undefined || f === null || f === "")) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // Optional: típus ellenőrzés számokra
  const numberFields = { year, mileage, priceFT, accel, torque, power, doors, seats };
  for (const [key, value] of Object.entries(numberFields)) {
    if (isNaN(Number(value))) {
      return res.status(400).json({ error: `${key} must be a number` });
    }
  }

  // Beszúrás az adatbázisba
  dbCars.prepare(`
    INSERT INTO cars (brand, model, year, body, mileage, color, priceFT, fuel, gearbox, drive, accel, torque, power, doors, seats)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(brand, model, Number(year), body, Number(mileage), color, Number(priceFT), fuel, gearbox, drive, Number(accel), Number(torque), Number(power), Number(doors), Number(seats));

  res.json({ success: true, addedBy: req.user?.username });
});


export default router;
