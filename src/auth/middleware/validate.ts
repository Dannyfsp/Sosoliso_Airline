import { Request, Response, NextFunction } from "express";

export const registerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { first_name, last_name, email, password } = req.body;
  switch (true) {
    case !first_name:
      return res.status(400).json({ message: "first name is required!" });
    case !last_name:
      return res.status(400).json({ message: "last name is required" });
    case !email:
      return res.status(400).json({ message: "email is required" });
    case !password || password.length < 5:
      return res.status(400).json({
        message: "password is required and must be greater than 5 characters",
      });
    default:
      next();
  }
};

export const loginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  switch (true) {
    case !email:
      return res.status(400).json({ message: "email is required" });
    case !password || password.length < 5:
      return res.status(400).json({
        message: "password is required and must be greater than 5 characters",
      });
    default:
      next();
  }
};
