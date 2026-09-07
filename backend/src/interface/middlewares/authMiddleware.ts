import { Request, Response, NextFunction } from "express";
import container from "../../infrastructure/di/container";
import TYPES from "../../infrastructure/di/types";
import { ITokenService } from "../../infrastructure/services/ITokenService";

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication token missing" });
    return;
  }
  const token = header.split(" ")[1];
  try {
    const tokenService = container.get<ITokenService>(TYPES.ITokenService);
    const payload = tokenService.verify(token);
    req.userId = payload.userId;
    req.userEmail = payload.email;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
