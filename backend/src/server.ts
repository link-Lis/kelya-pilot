import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import authRoutes from "./auth";
import clientsRoutes from "./clients";
import scoreRoutes from "./score";

dotenv.config();

const app = express();

// Sécurité + parsing
app.use(helmet());
app.use(express.json());

// CORS (à ajuster quand le frontend sera déployé)
app.use(
  cors({
    origin: [
      "https://kelya-pilot.onrender.com",
      "http://localhost:3000",
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

app.get("/", (_req, res) => res.send("Kelya Pilot API (TS) is running 🚀"));
app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use("/clients", clientsRoutes);
app.use("/score", scoreRoutes);

const PORT = Number(process.env.PORT || 10000);
app.listen(PORT, () => console.log(`API listening on :${PORT}`));
