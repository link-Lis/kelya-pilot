import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth, AuthedRequest } from "./requireAuth.js";

const prisma = new PrismaClient();
const router = Router();
router.use(requireAuth);

router.get("/", async (req: AuthedRequest, res) => {
  const userId = req.userId!;

  // V1 simple: Structure = nombre de clients (capé), Activité/Conversion/Régularité à 0 pour l'instant
  const clientsCount = await prisma.client.count({ where: { userId } });

  const structure = Math.min(25, Math.round((clientsCount / 10) * 25)); // 10 clients => 25
  const activity = 0;
  const conversion = 0;
  const regularity = 0;

  const total = structure + activity + conversion + regularity;

  res.json({
    total,
    pillars: { structure, activity, conversion, regularity },
    meta: { clientsCount }
  });
});

export default router;

