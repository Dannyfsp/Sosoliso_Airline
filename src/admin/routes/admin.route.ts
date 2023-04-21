import { Router } from "express";
import {
  addFlight,
  getAllBookings,
  getAllCancelledFlight,
  getAllPassengers,
} from "../controllers/admin.controller";
import { validateMiddleware } from "../middleware/validate";
import { adminAuth } from "../middleware/admin.middleware";
import { authMiddleware } from "../../auth/middleware/auth";

export const router: Router = Router();

router.get("/admin/bookings", authMiddleware, adminAuth, getAllBookings);
router.get("/admin/passengers", authMiddleware, adminAuth, getAllPassengers);
router.get(
  "/admin/cancelled",
  authMiddleware,
  adminAuth,
  getAllCancelledFlight
);
router.post(
  "/admin/flight",
  validateMiddleware,
  authMiddleware,
  adminAuth,
  addFlight
);
