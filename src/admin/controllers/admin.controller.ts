import { Request, Response } from "express";
import { IAddFlight, createFlight } from "../interface/admin.interface";
import { adminService } from "../services/admin.service";
import { IPassenger } from "../../auth/interface/auth.interface";
import { authSerice } from "../../auth/services/auth.service";

export const addFlight = async (
  req: Request<{}, {}, createFlight>,
  res: Response<IAddFlight>
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
  try {
    const flight = await adminService.addFlight(
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
      price_economy_class
    );

    return res.status(201).json(flight);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export const getAllPassengers = async (
  req: Request,
  res: Response
): Promise<IPassenger[] | any> => {
  try {
    const passengers = await adminService.getAll("passenger");
    if (passengers.length <= 0)
      return res.status(400).json({ message: "No passenger yet" });

    return res.status(200).json(passengers);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export const getAllBookings = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const bookings = await adminService.getAll("booking");
    if (bookings.length <= 0)
      return res.status(400).json({ message: "No bookings yet" });

    return res.status(200).json(bookings);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export const getAllCancelledFlight = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const isCanlledFlight = await adminService.getCancelledFlight();
    if (isCanlledFlight.length <= 0)
      return res.status(400).json({ message: "No Cancelled flight" });

    return res.status(200).json(isCanlledFlight);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export const getFlight = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  try {
    const flight = await authSerice.findByPK(id, "flight");
    if (!flight)
      return res
        .status(400)
        .json({ message: "there is no flight details for this ID" });
    return res.status(200).json(flight);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export const getBooking = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  try {
    const booking = await authSerice.findByPK(id, "booking");
    if (!booking)
      return res
        .status(400)
        .json({ message: "there is no booking details for this ID" });
    return res.status(200).json(booking);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
