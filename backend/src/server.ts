import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Kelya Pilot API (TS) is running 🚀");
});

// Healthcheck (Render)
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => console.log(`API listening on :${PORT}`));
import authRoutes from "./auth.js";
app.use("/auth", authRoutes);
import clientsRoutes from "./clients.js";
app.use("/clients", clientsRoutes);
import scoreRoutes from "./score.js";
app.use("/score", scoreRoutes);


