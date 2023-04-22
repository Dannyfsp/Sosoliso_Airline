import { Router } from "express";
import { validateBooking } from "../middleware/booking.middleware";
import { authMiddleware } from "../../auth/middleware/auth";
import { bookFlight } from "../controllers/booking.controller";

export const router: Router = Router();

router.post(
  "/flight/booking/:flightId",
  authMiddleware,
  validateBooking,
  bookFlight
);
