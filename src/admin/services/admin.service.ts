import pool from "../../config/db";
import { IAddFlight } from "../interface/admin.interface";

export const adminService = {
  addFlight: async (
    departure_terminal_id: number,
    arrival_terminal_id: number,
    flight_type: string,
    departure_date_time: Date,
    arrival_date_time: Date,
    available_seats_first_class: number,
    price_first_class: number,
    available_seats_business_class: number,
    price_business_class: number,
    available_seats_economy_class: number,
    price_economy_class: number
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
