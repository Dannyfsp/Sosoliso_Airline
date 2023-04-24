import { Router } from "express";
import {
  allFlights,
  getAFlight,
  passengerLogout,
  passengerSignIn,
  passengerSignUp,
} from "../controllers/auth.controller";
import { loginMiddleware, registerMiddleware } from "../middleware/validate";
import { authMiddleware } from "../middleware/auth";
import signUpAndLoginLimiter from "../../utils/rateLimiter";

export const router: Router = Router();

router.get("/auth/flight", authMiddleware, allFlights);
router.get("/auth/flight/:flightId", authMiddleware, getAFlight);
router.post("/auth/signup", registerMiddleware, passengerSignUp);
router.post("/auth/signin", loginMiddleware, passengerSignIn);
router.delete("/auth/logout", authMiddleware, passengerLogout);
