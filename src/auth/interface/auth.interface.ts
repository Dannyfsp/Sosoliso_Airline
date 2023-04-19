import { Request } from "express";
export interface IPassenger {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  roles: string;
  created_at: Date;
}

export interface createPassenger {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export type Passenger = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  roles: string;
};

export interface IGetPassengerAuth extends Request {
  passenger: any;
}
