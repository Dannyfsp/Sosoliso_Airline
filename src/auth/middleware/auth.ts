import { Response, NextFunction } from "express";
import { IGetPassengerAuth } from "../interface/auth.interface";

export const authMiddleware = (
  req: IGetPassengerAuth,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.passenger)
    return res.status(403).json({ error: "Unauthorized 🔒🔒🔒" });
  req.passenger = req.session.passenger;
  next();
};
