import pool from "../../config/db";

export const paymentService = {
  getFlightId: async (passengerId: number) => {
    const result = await pool.query(
      "select flight_id, flight_class FROM booking WHERE passenger_id = $1",
      [passengerId]
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

  getPaymentInfo: async (passengerId: number) => {
    const result = await pool.query(
      "SELECT * FROM payment WHERE passenger_id = $1",
      [passengerId]
    );
    return result.rows[0];
  },

  updatePaymentStatus: async (status: string) => {
    return await pool.query("UPDATE payment SET payment_status = $1", [status]);
  },
};
