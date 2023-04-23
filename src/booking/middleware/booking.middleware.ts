import { Request, Response, NextFunction } from "express";
import { bookingService } from "../services/booking.service";

export const validateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { flightClass, numberOfSeats, seatNumber } = req.body;

  if (!flightClass || !/^(first|business|economy)-class$/.test(flightClass))
    return res.status(400).json({
      message:
        "flight class is required and can either be first-class, business-class, economy-class",
    });

  if (flightClass) {
    if (flightClass === "first-class") {
      const result = await bookingService.flightAvailability(
        "available_seats_first_class"
      );
      if (result)
        return res
          .status(400)
          .json({ message: "There are no available seats for first class" });
    }
    if (flightClass === "business-class") {
      const result = await bookingService.flightAvailability(
        "available_seats_business_class"
      );
      if (result)
        return res
          .status(400)
          .json({ message: "There are no available seats for business class" });
    }
    if (flightClass === "economy-class") {
      const result = await bookingService.flightAvailability(
        "available_seats_economy_class"
      );
      if (result)
        return res
          .status(400)
          .json({ message: "There are no available seats for economy class" });
    }
  }

  if (!numberOfSeats || typeof numberOfSeats !== "number")
    return res
      .status(400)
      .json({ message: "number of seats is required and should be a number" });

  if (!seatNumber || typeof seatNumber !== "string")
    return res
      .status(400)
      .json({ message: "seat number is required and a string" });

  if (seatNumber) {
    if (flightClass === "first-class") {
      if (!/^[1-3][AB]$/.test(seatNumber)) {
        return res.status(400).json({
          message: "Seat number must be 1A, 1B, 2A, 2B, 3A, or 3B",
        });
      }
    }
    if (flightClass === "business-class") {
      if (!/^[1-6][ABCD]$/.test(seatNumber)) {
        return res.status(400).json({
          message: "Seat number must be 1A, 1B, 1C, 1D, 2A... 6D",
        });
      }
    }
    if (flightClass === "economy-class") {
      if (!/^(10|[1-9])[A-I]$/.test(seatNumber)) {
        return res.status(400).json({
          message: "Seat number must be 1A, 1B, 1C... 10I",
        });
      }
    }
  }

  next();
};
