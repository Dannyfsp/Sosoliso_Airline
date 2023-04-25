import { NextFunction, Request, Response } from "express";
import { IGetPassengerAuth } from "../../auth/interface/auth.interface";
import { paymentService } from "../services/payment.service";

export const paymentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as IGetPassengerAuth).passenger;
  let { amount } = req.body;
  let { bookingId } = req.params;
  try {
    const confirmBooking = await paymentService.confirmBookingId(
      Number(bookingId),
      user.id
    );

    const getFlightClass = await paymentService.getFlightId(
      user.id,
      Number(bookingId)
    );

    const priceOfFlight = await paymentService.getPrice(
      getFlightClass.flight_id,
      Number(bookingId)
    );

    if (!amount || typeof amount !== "number")
      return res
        .status(400)
        .json({ message: "amount is required and must be a number" });

    if (getFlightClass.flight_class === "first-class") {
      const total = Number(amount) * confirmBooking.number_of_seats;
      if (priceOfFlight.price_first_class !== total)
        return res.status(400).json({ message: "amount not equals to price" });
    }

    if (getFlightClass.flight_class === "business-class") {
      const total = Number(amount) * confirmBooking.number_of_seats;
      if (priceOfFlight.price_business_class !== total)
        return res.status(400).json({ message: "amount not equals to price" });
    }

    if (getFlightClass.flight_class === "economy-class") {
      const total = Number(amount) * confirmBooking.number_of_seats;
      if (priceOfFlight.price_economy_class !== total)
        return res.status(400).json({ message: "amount not equals to price" });
    }

    next();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
