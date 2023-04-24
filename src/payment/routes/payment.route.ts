import { Router } from "express";
import { payment, verifyPayment } from "../controllers/payment.controller";
import { authMiddleware } from "../../auth/middleware/auth";

export const router: Router = Router();

router.post("/flight/payment/:bookingId", authMiddleware, payment);
router.get("/flight/payment/verify/:bookingId", authMiddleware, verifyPayment);
