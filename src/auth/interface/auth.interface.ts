import { Request } from "express";
export interface IPassenger {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string;
  createdAt?: Date;
}

export interface createPassenger {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type Passenger = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string;
};

export interface IGetPassengerAuth extends Request {
  passenger: any;
}
