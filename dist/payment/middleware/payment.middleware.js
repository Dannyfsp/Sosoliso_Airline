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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMiddleware = void 0;
const payment_service_1 = require("../services/payment.service");
const paymentMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.passenger;
    let { amount } = req.body;
    let { bookingId } = req.params;
    const getFlightClass = yield payment_service_1.paymentService.getFlightId(user.id, Number(bookingId));
    const priceOfFlight = yield payment_service_1.paymentService.getPrice(getFlightClass.flight_id, Number(bookingId));
    if (!amount || typeof amount !== "string")
        return res
            .status(400)
            .json({ message: "amount is required and must be a number" });
    if (getFlightClass.flight_class === "first-class") {
        if (priceOfFlight.price_first_class !== Number(amount))
            return res.status(400).json({ message: "amount not equals to price" });
    }
    if (getFlightClass.flight_class === "business-class") {
        if (priceOfFlight.price_business_class !== Number(amount))
            return res.status(400).json({ message: "amount not equals to price" });
    }
    if (getFlightClass.flight_class === "economy-class") {
        if (priceOfFlight.price_economy_class !== Number(amount))
            return res.status(400).json({ message: "amount not equals to price" });
    }
    next();
});
exports.paymentMiddleware = paymentMiddleware;
