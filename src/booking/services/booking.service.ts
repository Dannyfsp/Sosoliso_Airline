import pool from "../../config/db";

export const bookingService = {
  addBooking: async (
    flightId: number,
    passengerId: number,
    flightClass: string,
    numberOfSeats: number,
    seatNumber: number
  ) => {
    const result = await pool.query(
      `INSERT INTO booking (flight_id, passenger_id, flight_class, number_of_seats, seat_number) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [flightId, passengerId, flightClass, numberOfSeats, seatNumber]
    );
    return result.rows[0];
  },

  findSeatNumber: async (seatNumber: string, classType: string) => {
    const result = await pool.query(
      "SELECT * FROM booking WHERE seat_number = $1 AND flight_class = $2",
      [seatNumber, classType]
    );
    return result.rows[0];
  },

  updateClassSeats: async (
    classType: string,
    numberOfSeats: number,
    flightId: number
  ) => {
    return await pool.query(
      `UPDATE flight SET ${classType} = ${classType} - ${numberOfSeats} WHERE id = $1`,
      [flightId]
    );
  },

  flightAvailability: async (classType: string) => {
    const result = await pool.query(
      `SELECT * FROM flight WHERE ${classType} = 0`
    );
    return result.rows[0];
  },

  findBooking: async (passengerId: number) => {
    const result = await pool.query(
      "SELECT * FROM booking WHERE passenger_id = $1",
      [passengerId]
    );
    return result.rows[0];
  },

  bookingStatus: async (passengerId: number, bookingId: number) => {
    const sqlQuery: string = `SELECT b.*, pa.amount, pa.payment_ref, pa.payment_status FROM payment pa 
    JOIN booking b ON pa.booking_id = b.id WHERE b.passenger_id = $1 AND b.id = $2`;
    const result = await pool.query(sqlQuery, [passengerId, bookingId]);
    return result.rows[0];
  },
};
