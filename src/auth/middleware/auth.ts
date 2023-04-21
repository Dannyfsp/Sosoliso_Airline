import { Response, NextFunction, Request } from "express";
import { IGetPassengerAuth } from "../interface/auth.interface";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.passenger)
    return res.status(403).json({ error: "Unauthorized 🔒🔒🔒" });
  (req as IGetPassengerAuth).passenger = req.session.passenger;
  next();
};
