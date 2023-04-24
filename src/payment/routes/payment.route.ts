import { Router } from "express";
import { payment, verifyPayment } from "../controllers/payment.controller";
import { authMiddleware } from "../../auth/middleware/auth";
import { paymentMiddleware } from "../middleware/payment.middleware";

export const router: Router = Router();

router.post(
  "/flight/payment/:bookingId",
  paymentMiddleware,
  authMiddleware,
  payment
);
router.get("/flight/payment/verify/:bookingId", authMiddleware, verifyPayment);
