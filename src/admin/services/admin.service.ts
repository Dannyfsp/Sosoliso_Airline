import pool from "../../config/db";
import { IAddFlight } from "../interface/admin.interface";

export const adminService = {
  addFlight: async (
    departureTerminalId: number,
    arrivalTerminalId: number,
    flightType: string,
    departureDateTime: Date,
    arrivalDateTime: Date,
    availableSeatsFirstClass: number,
    priceFirstClass: number,
    availableSeatsBusinessClass: number,
    priceBusinessClass: number,
    availableSeatsEconomyClass: number,
    priceEconomyClass: number
  ): Promise<IAddFlight> => {
    let queries: string = `INSERT INTO flight (
        departure_terminal_id, 
        arrival_terminal_id, 
        flight_type, departure_date_time, 
        arrival_date_time, 
        available_seats_first_class, 
        price_first_class, 
        available_seats_business_class, 
        price_business_class, 
        available_seats_economy_class, 
        price_economy_class) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *`;
    let values: any = [
      departureTerminalId,
      arrivalTerminalId,
      flightType,
      departureDateTime,
      arrivalDateTime,
      availableSeatsFirstClass,
      priceFirstClass,
      availableSeatsBusinessClass,
      priceBusinessClass,
      availableSeatsEconomyClass,
      priceEconomyClass,
    ];
    const result = await pool.query(queries, values);
    return result.rows[0];
  },
  getAll: async (model: string) => {
    const result = await pool.query(`SELECT * FROM ${model}`);
    return result.rows;
  },
  getCancelledFlight: async () => {
    const result = await pool.query(
      "SELECT * FROM booking WHERE is_cancelled = true"
    );
    return result.rows;
  },
};
