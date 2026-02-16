import { Router } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { requireAuth, AuthedRequest } from "./requireAuth";

const prisma = new PrismaClient();
const router = Router();

router.use(requireAuth);

const ClientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
});

router.get("/", async (req: AuthedRequest, res) => {
  const clients = await prisma.client.findMany({
    where: { userId: req.userId! },
    orderBy: { createdAt: "desc" },
  });
  return res.json(clients);
});

router.post("/", async (req: AuthedRequest, res) => {
  const parsed = ClientSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const client = await prisma.client.create({
    data: { ...parsed.data, userId: req.userId! },
  });
  return res.json(client);
});

router.delete("/:id", async (req: AuthedRequest, res) => {
  const id = req.params.id;
  await prisma.client.deleteMany({ where: { id, userId: req.userId! } });
  return res.json({ ok: true });
});

export default router;

