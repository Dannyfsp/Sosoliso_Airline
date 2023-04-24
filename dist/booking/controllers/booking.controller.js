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
exports.getBooking = exports.bookFlight = void 0;
const auth_service_1 = require("../../auth/services/auth.service");
const booking_service_1 = require("../services/booking.service");
const bookFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const flightId = Number(req.params.flightId);
    const passengerId = req.passenger.id;
    const { flightClass, numberOfSeats, seatNumber } = req.body;
    try {
        const flightIdExist = yield auth_service_1.authSerice.findByPK(flightId, "flight");
        if (!flightIdExist)
            return res
                .status(400)
                .json({ message: `flight with the id ${flightId} does not exist` });
        const seatExist = yield booking_service_1.bookingService.findSeatNumber(seatNumber, flightClass);
        if (seatExist)
            return res.status(400).json({ message: "oops 😥😥 seat already taken" });
        const data = yield booking_service_1.bookingService.addBooking(flightId, passengerId, flightClass, numberOfSeats, seatNumber);
        if (flightClass === "first-class")
            yield booking_service_1.bookingService.updateClassSeats("available_seats_first_class", numberOfSeats, flightId);
        if (flightClass === "business-class")
            yield booking_service_1.bookingService.updateClassSeats("available_seats_business_class", numberOfSeats, flightId);
        if (flightClass === "economy-class")
            yield booking_service_1.bookingService.updateClassSeats("available_seats_economy_class", numberOfSeats, flightId);
        return res
            .status(201)
            .json({ message: "flight booked successfully", data });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.bookFlight = bookFlight;
const getBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.passenger;
    const { bookingId } = req.params;
    try {
        const data = yield booking_service_1.bookingService.bookingStatus(user.id, Number(bookingId));
        if (!data)
            return res
                .status(400)
                .json({ message: "You have not booked any flight yet" });
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getBooking = getBooking;
