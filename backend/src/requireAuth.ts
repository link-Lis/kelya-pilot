import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export type AuthedRequest = Request & { userId?: string };

function getJwtSecret(): string {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("Missing JWT_SECRET");
  return s;
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const h = req.headers.authorization;
  if (!h?.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });

  const token = h.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, getJwtSecret()) as JwtPayload | string;
    const sub = typeof payload === "string" ? undefined : payload.sub;

    if (!sub || typeof sub !== "string") {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.userId = sub;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
