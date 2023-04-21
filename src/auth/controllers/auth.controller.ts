import { Request, Response } from "express";
import { authSerice } from "../services/auth.service";
import { Passenger, createPassenger } from "../interface/auth.interface";
import { hash } from "../../utils/bcrypt";

export const passengerSignUp = async (
  req: Request<{}, {}, createPassenger>,
  res: Response
): Promise<Response> => {
  let { first_name, last_name, email, password } = req.body;
  try {
    const userExist: Passenger = await authSerice.findByEmail(email);
    if (userExist)
      return res
        .status(400)
        .json({ message: "User already exist, please login" });

    let hashPassword = await hash.hashPwd(password);
    password = hashPassword;

    const passenger = await authSerice.addPassenger(
      first_name,
      last_name,
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
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};
