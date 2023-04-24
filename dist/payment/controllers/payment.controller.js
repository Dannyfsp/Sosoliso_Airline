"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.payment = void 0;
const axios_1 = require("../../utils/axios");
const payment_service_1 = require("../services/payment.service");
const send_receipt_1 = __importDefault(require("../../utils/send.receipt"));
const booking_service_1 = require("../../booking/services/booking.service");
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.passenger;
    let { amount } = req.body;
    let { bookingId } = req.params;
    try {
        const confirmBooking = yield payment_service_1.paymentService.confirmBookingId(Number(bookingId), user.id);
        if (!confirmBooking)
            return res
                .status(200)
                .json({ message: "Sorry the bookingId seems to be incorrect" });
        amount = amount + "00";
        const request = {
            email: user.email,
            amount,
            callback_url: "http://localhost:1010/welcome",
            metadata: {
                booking_id: bookingId,
            },
        };
        const response = yield (0, axios_1.initializeTransaction)(request);
        const paymentData = yield payment_service_1.paymentService.addPayment(Number(bookingId), user.id, response.data.data.reference, Number(amount));
        return res
            .status(200)
            .json({ auth_url: response.data.data.authorization_url, paymentData });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});
exports.payment = payment;
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.passenger;
    const { bookingId } = req.params;
    try {
        const confirmBooking = yield payment_service_1.paymentService.confirmBookingId(Number(bookingId), user.id);
        console.log(1);
        if (!confirmBooking)
            return res
                .status(200)
                .json({ message: "Sorry the bookingId seems to be incorrect" });
        const status = yield booking_service_1.bookingService.bookingStatus(user.id, Number(bookingId));
        const response = yield (0, axios_1.verifyTransaction)(status.payment_ref);
        if (response.data.data.status === "success") {
            yield payment_service_1.paymentService.updatePaymentStatus("success", user.id, Number(bookingId));
            yield (0, send_receipt_1.default)(user.email, user.first_name, status.amount, status.payment_ref, status.flight_class, status.seat_number);
            return res.status(200).json({
                message: "payment was successful 😊😊😊, please check your email for receipt",
            });
        }
        else {
            yield payment_service_1.paymentService.updatePaymentStatus("failed", user.id, Number(bookingId));
            return res
                .status(400)
                .json({ message: "payment was unsuccessful 😥😥😥" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.verifyPayment = verifyPayment;
