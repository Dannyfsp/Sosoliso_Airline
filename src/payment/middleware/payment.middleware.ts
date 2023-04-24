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

  const getFlightClass = await paymentService.getFlightId(
    user.id,
    Number(bookingId)
  );

  const priceOfFlight = await paymentService.getPrice(
    getFlightClass.flight_id,
    Number(bookingId)
  );

  if (!amount || typeof amount !== "string")
    return res
      .status(400)
      .json({ message: "amount is required and must be a number" });

  if (getFlightClass.flight_class === "first-class") {
    if (priceOfFlight.price_first_class !== Number(amount))
      return res.status(400).json({ message: "amount not equals to price" });
  }

  if (getFlightClass.flight_class === "business-class") {
    if (priceOfFlight.price_business_class !== Number(amount))
      return res.status(400).json({ message: "amount not equals to price" });
  }

  if (getFlightClass.flight_class === "economy-class") {
    if (priceOfFlight.price_economy_class !== Number(amount))
      return res.status(400).json({ message: "amount not equals to price" });
  }

  next();
};