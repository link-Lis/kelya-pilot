import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./auth";
import clientsRoutes from "./clients";
import scoreRoutes from "./score";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("Kelya Pilot API (TS) is running 🚀"));
app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use("/clients", clientsRoutes);
app.use("/score", scoreRoutes);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => console.log(`API listening on :${PORT}`));
