import Database from "better-sqlite3";

// Users DB
export const dbUser = new Database("database.db");
dbUser.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('user','admin'))
  )
`).run();

// Cars DB
export const dbCars = new Database("database.db");
dbCars.prepare(`
  CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    body TEXT NOT NULL,
    mileage INTEGER NOT NULL,
    color TEXT NOT NULL,
    priceFT INTEGER NOT NULL,
    fuel TEXT NOT NULL,
    gearbox TEXT NOT NULL,
    drive TEXT NOT NULL,
    accel REAL NOT NULL,
    torque INTEGER NOT NULL,
    power INTEGER NOT NULL,
    doors INTEGER NOT NULL,
    seats INTEGER NOT NULL
  )
`).run();


