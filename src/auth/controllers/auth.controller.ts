import { Request, Response } from "express";
import { authSerice } from "../services/auth.service";
import { Passenger, createPassenger } from "../interface/auth.interface";
import { hash } from "../../utils/bcrypt";
import { adminService } from "../../admin/services/admin.service";

export const passengerSignUp = async (
  req: Request<{}, {}, createPassenger>,
  res: Response
): Promise<Response> => {
  let { firstName, lastName, email, password } = req.body;
  try {
    const userExist: Passenger = await authSerice.findByEmail(email);
    if (userExist)
      return res
        .status(400)
        .json({ message: "User already exist, please login" });

    let hashPassword = await hash.hashPwd(password);
    password = hashPassword;

    const passenger = await authSerice.addPassenger(
      firstName,
      lastName,
      email,
      password
    );

    delete passenger.password;
    delete passenger.roles;
    delete passenger.created_at;

    return res
      .status(201)
      .json({ message: "passenger created successfully", passenger });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const passengerSignIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let { email, password } = req.body;
  try {
    let passenger: Passenger | null = await authSerice.findByEmail(email);
    if (!passenger)
      return res
        .status(400)
        .json({ message: "User does exist, please sign up" });

    const correctPassword = await hash.comparePassword(
      password,
      passenger.password
    );
    if (!correctPassword)
      return res.status(400).json({ message: "password mismatched" });

    req.session.passenger = passenger;

    return res.status(200).json({
      message: "user logged in successfully",
      user: req.session.passenger.id,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const passengerLogout = async (req: Request, res: Response) => {
  try {
    await new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            res.status(200).json({ message: "user logged out successfully" })
          );
        }
      });
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const allFlights = async (req: Request, res: Response) => {
  const page: number = Number(req.query.page);
  const limit: number = 5;
  const offset: number = (page - 1) * limit;
  try {
    if (page) {
      const pagination = await authSerice.allFlight(limit, offset);
      if (pagination.length <= 0)
        return res.status(400).json({ message: "No flights for this page" });
      else return res.status(200).json(pagination);
    }

    const data = await adminService.getAll("flight");
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAFlight = async (req: Request, res: Response) => {
  const flightId = req.params.flightId;
  try {
    const result = await authSerice.findByPK(Number(flightId), "flight");
    if (!result)
      return res
        .status(400)
        .json({ message: `flight with the id ${flightId} does not exist` });
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
