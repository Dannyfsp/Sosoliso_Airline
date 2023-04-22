import { Response, NextFunction, Request } from "express";

export const validateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    departureTerminalId,
    arrivalTerminalId,
    flightType,
    departureDateTime,
    arrivalDateTime,
    availableSeatsFirstClass,
    priceFirstClass,
    availableSeatsBusinessClass,
    priceBusinessClass,
    availableSeatsEconomyClass,
    priceEconomyClass,
  } = req.body;

  switch (true) {
    case !departureTerminalId:
      return res.status(400).json({
        message: "Departure Terminal id is required and must be a number",
      });
    case !arrivalTerminalId:
      return res.status(400).json({
        message: "Arrival Terminal id is required and must be a number",
      });
    case !flightType:
      return res.status(400).json({
        message:
          "Flight type is required and must be either international or local",
      });
    case !departureDateTime:
      return res.status(400).json({
        message: "Departure Date and Time is required and must be a date",
      });
    case !arrivalDateTime:
      return res.status(400).json({
        message: "Arrival Date and Time is required and must be a date",
      });
    case !availableSeatsFirstClass:
      return res.status(400).json({
        message:
          "Available seats of first class is required and must be a number",
      });
    case !priceFirstClass:
      return res.status(400).json({
        message: "Price of first class is required and must be a number",
      });
    case !availableSeatsBusinessClass:
      return res.status(400).json({
        message:
          "Available seats of business class is required and must be a number",
      });
    case !priceBusinessClass:
      return res.status(400).json({
        message: "Price of business class is required and must be a number",
      });
    case !availableSeatsEconomyClass:
      return res.status(400).json({
        message:
          "Available seats of economy class is required and must be a number",
      });
    case !priceEconomyClass:
      return res.status(400).json({
        message: "Price of economy class is required and must be a number",
      });
    default:
      next();
  }
};
