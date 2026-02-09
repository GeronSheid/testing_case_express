import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "./token.service.js";
  
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }
  const payload = verifyAccessToken(token);
  if (!payload) {
    return res.status(401).json({ message: "Invalid access token" });
  }
  req.user = { ...payload, userId: Number(payload.userId) };
  next();
}