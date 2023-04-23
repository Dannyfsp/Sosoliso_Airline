import { Request, Response } from "express";
import { IGetPassengerAuth } from "../../auth/interface/auth.interface";
import { PaystackInitializeRequest } from "../interface/payment.interface";
import { initializeTransaction, verifyTransaction } from "../../utils/axios";
import { paymentService } from "../services/payment.service";

export const payment = async (req: Request, res: Response) => {
  const { email, id } = (req as IGetPassengerAuth).passenger;
  let { amount } = req.body;
  let { bookingId } = req.params;
  try {
    const getFlightClass = await paymentService.getFlightId(id);

    console.log(getFlightClass);

    const checkAmount: number = Number(amount);

    const priceOfFlight = await paymentService.getPrice(
      getFlightClass.flight_id,
      Number(bookingId)
    );
    console.log("Does it work here");

    if (getFlightClass.flight_class === "first-class") {
      if (priceOfFlight.price_first_class !== checkAmount)
        return res.status(400).json({ message: "amount not equals to price" });
    }

    if (getFlightClass.flight_class === "business-class") {
      if (priceOfFlight.price_business_class !== checkAmount)
        return res.status(400).json({ message: "amount not equals to price" });
    }

    if (getFlightClass.flight_class === "economy-class") {
      if (priceOfFlight.price_economy_class !== checkAmount)
        return res.status(400).json({ message: "amount not equals to price" });
    }

    amount = amount + "00";

    const request: PaystackInitializeRequest = {
      email,
      amount, // amount in kobo (i.e. 50000 kobo = 500 naira)
      callback_url: "http://localhost:1010",
      metadata: {
        booking_id: bookingId,
      },
    };

    const response = await initializeTransaction(request);

    console.log(response.data);

    const paymentData = await paymentService.addPayment(
      Number(bookingId),
      id,
      response.data.data.reference,
      checkAmount
    );

    return res
      .status(200)
      .json({ auth_url: response.data.data.authorization_url, paymentData });
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const { id } = (req as IGetPassengerAuth).passenger;
  try {
    const paymentInfo = await paymentService.getPaymentInfo(id);

    const response = await verifyTransaction(paymentInfo.payment_ref);

    if (response.data.data.status === "success") {
      await paymentService.updatePaymentStatus("success");
      return res.status(200).json({ message: "payment was successful 😊😊😊" });
    } else {
      await paymentService.updatePaymentStatus("failed");
      return res
        .status(400)
        .json({ message: "payment was unsuccessful 😥😥😥" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
