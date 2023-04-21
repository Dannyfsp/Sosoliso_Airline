import { Response, NextFunction, Request } from "express";
import { IGetPassengerAuth } from "../../auth/interface/auth.interface";
import { createFlight } from "../interface/admin.interface";

export const validateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    departure_terminal_id,
    arrival_terminal_id,
    flight_type,
    departure_date_time,
    arrival_date_time,
    available_seats_first_class,
    price_first_class,
    available_seats_business_class,
    price_business_class,
    available_seats_economy_class,
    price_economy_class,
  } = req.body;

  switch (true) {
    case !departure_terminal_id:
      return res.status(400).json({
        message: "Departure Terminal id is required and must be a number",
      });
    case !arrival_terminal_id:
      return res.status(400).json({
        message: "Arrival Terminal id is required and must be a number",
      });
    case !flight_type:
      return res.status(400).json({
        message:
          "Flight type is required and must be either international or local",
      });
    case !departure_date_time:
      return res.status(400).json({
        message: "Departure Date and Time is required and must be a date",
      });
    case !arrival_date_time:
      return res.status(400).json({
        message: "Arrival Date and Time is required and must be a date",
      });
    case !available_seats_first_class:
      return res.status(400).json({
        message:
          "Available seats of first class is required and must be a number",
      });
    case !price_first_class:
      return res.status(400).json({
        message: "Price of first class is required and must be a number",
      });
    case !available_seats_business_class:
      return res.status(400).json({
        message:
          "Available seats of business class is required and must be a number",
      });
    case !price_business_class:
      return res.status(400).json({
        message: "Price of business class is required and must be a number",
      });
    case !available_seats_economy_class:
      return res.status(400).json({
        message:
          "Available seats of economy class is required and must be a number",
      });
    case !price_economy_class:
      return res.status(400).json({
        message: "Price of economy class is required and must be a number",
      });
    default:
      next();
  }
};
