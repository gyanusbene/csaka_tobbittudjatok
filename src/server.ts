import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import carsRoutes from "./routes/cars";
import adminsRoutes from "./routes/admins";
import usersRoutes from "./routes/users";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carsRoutes);
app.use("/api/admins", adminsRoutes);
app.use("/api/users", usersRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
