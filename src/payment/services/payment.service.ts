import pool from "../../config/db";

export const paymentService = {
  getFlightId: async (passengerId: number, bookingId: number) => {
    const result = await pool.query(
      "SELECT flight_id, flight_class FROM booking WHERE passenger_id = $1 AND id = $2",
      [passengerId, bookingId]
    );
    return result.rows[0];
  },

  getPrice: async (flightId: number, bookingId: number) => {
    const sqlQuery: string = `SELECT f.price_first_class, 
        f.price_business_class, 
        f.price_economy_class 
        FROM booking b JOIN flight f ON b.flight_id = $1 WHERE b.id = $2`;
    const result = await pool.query(sqlQuery, [flightId, bookingId]);
    return result.rows[0];
  },

  addPayment: async (
    bookingId: number,
    passengerId: number,
    paymentRef: string,
    amount: number
  ) => {
    const result = await pool.query(
      `INSERT INTO payment (booking_id, passenger_id, payment_ref, amount) VALUES ($1, $2, $3, $4) RETURNING *`,
      [bookingId, passengerId, paymentRef, amount]
    );
    return result.rows[0];
  },

  getPaymentInfo: async (passengerId: number, bookingId: number) => {
    const result = await pool.query(
      "SELECT * FROM payment WHERE passenger_id = $1 AND booking_id = $2",
      [passengerId, bookingId]
    );
    return result.rows[0];
  },

  updatePaymentStatus: async (
    status: string,
    passengerId: number,
    bookingId: number
  ) => {
    return await pool.query(
      "UPDATE payment SET payment_status = $1 WHERE passenger_id = $2 AND booking_id = $3",
      [status, passengerId, bookingId]
    );
  },

  confirmBookingId: async (bookingId: number, passengerId: number) => {
    const result = await pool.query(
      "SELECT * FROM booking WHERE id = $1 AND passenger_id = $2",
      [bookingId, passengerId]
    );
    return result.rows[0];
  },
};
