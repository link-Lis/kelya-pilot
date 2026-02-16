import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth, AuthedRequest } from "./requireAuth";

const prisma = new PrismaClient();
const router = Router();
router.use(requireAuth);

router.get("/", async (req: AuthedRequest, res) => {
  const userId = req.userId!;

  // V1: Structure basé sur nombre de clients (cap 10 -> 25)
  const clientsCount = await prisma.client.count({ where: { userId } });

  const structure = Math.min(25, Math.round((clientsCount / 10) * 25));
  const activity = 0;
  const conversion = 0;
  const regularity = 0;

  const total = structure + activity + conversion + regularity;

  return res.json({
    total,
    pillars: { structure, activity, conversion, regularity },
    meta: { clientsCount }
  });
});

export default router;

