import { Request, Response, NextFunction } from "express";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.passenger.roles !== "admin") {
    return res
      .status(403)
      .json({ message: "🔒🔒🔒 Unauthorized, you're not an admin" });
  } else {
    next();
  }
};
