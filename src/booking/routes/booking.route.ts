import { Router } from "express";
import { validateBooking } from "../middleware/booking.middleware";
import { authMiddleware } from "../../auth/middleware/auth";
import {
  bookFlight,
  cancelFlight,
  getBooking,
} from "../controllers/booking.controller";

export const router: Router = Router();

router.get("/flight/booking/:bookingId", authMiddleware, getBooking);
router.patch("/flight/booking", authMiddleware, cancelFlight);
router.post(
  "/flight/booking/:flightId",
  authMiddleware,
  validateBooking,
  bookFlight
);
