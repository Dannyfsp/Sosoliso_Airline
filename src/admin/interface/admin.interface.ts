import { Request } from "express";
import { IGetPassengerAuth } from "../../auth/interface/auth.interface";

export interface IAddFlight {
  id: number;
  departureTerminalId: number;
  arrivalTerminalId: number;
  flight_type: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
  availableSeatsFirstClass: number;
  priceFirstClass: number;
  availableSeatsBusinessClass: number;
  priceBusinessClass: number;
  availableSeatsEconomyClass: number;
  priceEconomyClass: number;
}

export interface createFlight {
  departureTerminalId: number;
  arrivalTerminalId: number;
  flightType: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
  availableSeatsFirstClass: number;
  priceFirstClass: number;
  availableSeatsBusinessClass: number;
  priceBusinessClass: number;
  availableSeatsEconomyClass: number;
  priceEconomyClass: number;
}

export interface customRequest extends Request {
  passenger: IGetPassengerAuth;
}
