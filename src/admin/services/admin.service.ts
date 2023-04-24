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
    const result = await pool.query(`SELECT * FROM $1`, [model]);
    return result.rows;
  },
  getCancelledFlight: async () => {
    const result = await pool.query(
      "SELECT * FROM booking WHERE is_cancelled = true"
    );
    return result.rows;
  },
  getAllFlight: async (limit: number = 20, offset: number = 0) => {
    const sqlQuery = `SELECT f.id, 
    f.flight_type, 
    f.available_seats_first_class, 
    f.price_first_class, 
    f.available_seats_business_class, 
    f.price_business_class, 
    f.available_seats_economy_class, 
    f.price_economy_class, 
    dt.airport_name as departure_airport, 
    dt.city as departure_city, 
    dt.country as departure_country, 
    ar.airport_name as arrival_airport, 
    ar.city as arrival_city, 
    ar.country as arrival_country, 
    f.departure_date_time, 
    f.arrival_date_time 
    FROM flight f 
      JOIN departure_terminal dt 
        ON dt.id = f.departure_terminal_id 
      JOIN arrival_terminal ar 
        ON ar.id = f.arrival_terminal_id LIMIT $1 OFFSET $2`;
    const result = await pool.query(sqlQuery, [limit, offset]);
    return result.rows;
  },

  oneFlight: async (flightId: number) => {
    const sqlQuery = `SELECT f.id, 
    f.flight_type, 
    f.available_seats_first_class, 
    f.price_first_class, 
    f.available_seats_business_class, 
    f.price_business_class, 
    f.available_seats_economy_class, 
    f.price_economy_class, 
    dt.airport_name as departure_airport, 
    dt.city as departure_city, 
    dt.country as departure_country, 
    ar.airport_name as arrival_airport, 
    ar.city as arrival_city, 
    ar.country as arrival_country, 
    f.departure_date_time, 
    f.arrival_date_time 
    FROM flight f 
      JOIN departure_terminal dt 
        ON dt.id = f.departure_terminal_id 
      JOIN arrival_terminal ar 
        ON ar.id = f.arrival_terminal_id WHERE f.id = $1`;
    const result = await pool.query(sqlQuery, [flightId]);
    return result.rows[0];
  },
};
