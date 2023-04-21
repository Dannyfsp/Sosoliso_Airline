import pool from "../../config/db";
import { IPassenger } from "../interface/auth.interface";

export const authSerice = {
  findByPK: async (id: number, model: string): Promise<IPassenger | any> => {
    const result = await pool.query(`SELECT * FROM ${model} WHERE id = $1`, [
      id,
    ]);
    return result.rows[0];
  },

  findByEmail: async (email: string): Promise<IPassenger> => {
    const result = await pool.query(
      "SELECT * FROM passenger WHERE email = $1",
      [email]
    );
    return result.rows[0];
  },

  addPassenger: async (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): Promise<any> => {
    const result = await pool.query(
      "INSERT INTO passenger (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, password]
    );
    return result.rows[0];
  },

  allFlight: async (limit: number, offset: number) => {
    const result = await pool.query(
      `SELECT * FROM flight LIMIT ${limit} OFFSET ${offset}`
    );
    return result.rows;
  },
};
