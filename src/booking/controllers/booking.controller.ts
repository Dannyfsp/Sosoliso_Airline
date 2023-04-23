import { Request, Response } from "express";
import { IGetPassengerAuth } from "../../auth/interface/auth.interface";
import { authSerice } from "../../auth/services/auth.service";
import { bookingService } from "../services/booking.service";

export const bookFlight = async (req: Request, res: Response) => {
  const flightId: number = Number(req.params.flightId);
  const passengerId = (req as IGetPassengerAuth).passenger.id;
  const { flightClass, numberOfSeats, seatNumber } = req.body;

  try {
    const flightIdExist = await authSerice.findByPK(flightId, "flight");

    if (!flightIdExist)
      return res
        .status(400)
        .json({ message: `flight with the id ${flightId} does not exist` });

    const seatExist = await bookingService.findSeatNumber(
      seatNumber,
      flightClass
    );
    if (seatExist)
      return res.status(400).json({ message: "oops 😥😥 seat already taken" });

    const data = await bookingService.addBooking(
      flightId,
      passengerId,
      flightClass,
      numberOfSeats,
      seatNumber
    );

    if (flightClass === "first-class")
      await bookingService.updateClassSeats(
        "available_seats_first_class",
        numberOfSeats
      );
    if (flightClass === "business-class")
      await bookingService.updateClassSeats(
        "available_seats_business_class",
        numberOfSeats
      );
    if (flightClass === "economy-class")
      await bookingService.updateClassSeats(
        "available_seats_economy_class",
        numberOfSeats
      );

    return res
      .status(201)
      .json({ message: "flight booked successfully", data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  const passengerId = (req as IGetPassengerAuth).passenger.id;
  try {
    const data = await bookingService.findBooking(passengerId);
    if (!data)
      return res
        .status(400)
        .json({ message: "You have not booked any flight yet" });
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
