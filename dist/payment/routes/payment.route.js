"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const auth_1 = require("../../auth/middleware/auth");
exports.router = (0, express_1.Router)();
exports.router.post("/flight/payment/:bookingId", auth_1.authMiddleware, payment_controller_1.payment);
exports.router.get("/flight/payment/verify/:bookingId", auth_1.authMiddleware, payment_controller_1.verifyPayment);
