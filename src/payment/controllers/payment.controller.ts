import { Request, Response } from "express";
import { IGetPassengerAuth } from "../../auth/interface/auth.interface";
import { PaystackInitializeRequest } from "../interface/payment.interface";
import { initializeTransaction, verifyTransaction } from "../../utils/axios";
import { paymentService } from "../services/payment.service";
import generateReceiptAndSendEmail from "../../utils/send.receipt";
import { bookingService } from "../../booking/services/booking.service";

export const payment = async (req: Request, res: Response) => {
  const user = (req as IGetPassengerAuth).passenger;
  let { amount } = req.body;
  let { bookingId } = req.params;
  try {
    const confirmBooking = await paymentService.confirmBookingId(
      Number(bookingId),
      user.id
    );
    if (!confirmBooking)
      return res
        .status(200)
        .json({ message: "Sorry the bookingId seems to be incorrect" });
    const realAmount = amount;
    amount = amount + "00";

    const request: PaystackInitializeRequest = {
      email: user.email,
      amount,
      callback_url: "https://sosoliso.herokuapp.com/welcome",
      metadata: {
        booking_id: bookingId,
      },
    };

    const response = await initializeTransaction(request);

    const paymentData = await paymentService.addPayment(
      Number(bookingId),
      user.id,
      response.data.data.reference,
      realAmount
    );

    return res.status(200).json({
      auth_url: response.data.data.authorization_url,
      paymentData,
      bookingId,
    });
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  const user = (req as IGetPassengerAuth).passenger;
  const { bookingId } = req.params;
  try {
    const confirmBooking = await paymentService.confirmBookingId(
      Number(bookingId),
      user.id
    );

    if (!confirmBooking)
      return res
        .status(200)
        .json({ message: "Sorry the bookingId seems to be incorrect" });

    const status = await bookingService.bookingStatus(
      user.id,
      Number(bookingId)
    );

    const response = await verifyTransaction(status.payment_ref);

    if (response.data.data.status === "success") {
      await paymentService.updatePaymentStatus(
        "success",
        user.id,
        Number(bookingId)
      );

      await generateReceiptAndSendEmail(
        user.email,
        user.first_name,
        status.amount,
        status.payment_ref,
        status.flight_class,
        status.seat_number
      );
      return res.status(200).json({
        message:
          "payment was successful 😊😊😊, please check your email for receipt",
      });
    } else {
      await paymentService.updatePaymentStatus(
        "failed",
        user.id,
        Number(bookingId)
      );
      return res
        .status(400)
        .json({ message: "payment was unsuccessful 😥😥😥" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
