import { Router } from "express";
import { validateBooking } from "../middleware/booking.middleware";
import { authMiddleware } from "../../auth/middleware/auth";
import { bookFlight, getBooking } from "../controllers/booking.controller";

export const router: Router = Router();

router.get("/flight/booking/:bookingId", authMiddleware, getBooking);
router.post(
  "/flight/booking/:flightId",
  authMiddleware,
  validateBooking,
  bookFlight
);
