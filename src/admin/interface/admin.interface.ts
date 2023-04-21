import { Request } from "express";
import { IGetPassengerAuth } from "../../auth/interface/auth.interface";

export interface IAddFlight {
  id: number;
  departure_terminal_id: number;
  arrival_terminal_id: number;
  flight_type: string;
  departure_date_time: Date;
  arrival_date_time: Date;
  available_seats_first_class: number;
  price_first_class: number;
  available_seats_business_class: number;
  price_business_class: number;
  available_seats_economy_class: number;
  price_economy_class: number;
}

export interface createFlight {
  departure_terminal_id: number;
  arrival_terminal_id: number;
  flight_type: string;
  departure_date_time: Date;
  arrival_date_time: Date;
  available_seats_first_class: number;
  price_first_class: number;
  available_seats_business_class: number;
  price_business_class: number;
  available_seats_economy_class: number;
  price_economy_class: number;
}

export interface customRequest extends Request {
  passenger: IGetPassengerAuth;
}
