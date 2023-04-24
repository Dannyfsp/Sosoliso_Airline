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
exports.getBooking = exports.getFlight = exports.getAllCancelledFlight = exports.getAllBookings = exports.getAllPassengers = exports.addFlight = void 0;
const admin_service_1 = require("../services/admin.service");
const auth_service_1 = require("../../auth/services/auth.service");
const addFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { departureTerminalId, arrivalTerminalId, flightType, departureDateTime, arrivalDateTime, availableSeatsFirstClass, priceFirstClass, availableSeatsBusinessClass, priceBusinessClass, availableSeatsEconomyClass, priceEconomyClass, } = req.body;
    try {
        const flight = yield admin_service_1.adminService.addFlight(departureTerminalId, arrivalTerminalId, flightType, departureDateTime, arrivalDateTime, availableSeatsFirstClass, priceFirstClass, availableSeatsBusinessClass, priceBusinessClass, availableSeatsEconomyClass, priceEconomyClass);
        return res.status(201).json(flight);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.addFlight = addFlight;
const getAllPassengers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passengers = yield admin_service_1.adminService.getAll("passenger");
        if (passengers.length <= 0)
            return res.status(400).json({ message: "No passenger yet" });
        return res.status(200).json(passengers);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getAllPassengers = getAllPassengers;
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield admin_service_1.adminService.getAll("booking");
        if (bookings.length <= 0)
            return res.status(400).json({ message: "No bookings yet" });
        return res.status(200).json(bookings);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getAllBookings = getAllBookings;
const getAllCancelledFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isCanlledFlight = yield admin_service_1.adminService.getCancelledFlight();
        if (isCanlledFlight.length <= 0)
            return res.status(400).json({ message: "No Cancelled flight" });
        return res.status(200).json(isCanlledFlight);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getAllCancelledFlight = getAllCancelledFlight;
const getFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const flight = yield auth_service_1.authSerice.findByPK(id, "flight");
        if (!flight)
            return res
                .status(400)
                .json({ message: "there is no flight details for this ID" });
        return res.status(200).json(flight);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getFlight = getFlight;
const getBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const booking = yield auth_service_1.authSerice.findByPK(id, "booking");
        if (!booking)
            return res
                .status(400)
                .json({ message: "there is no booking details for this ID" });
        return res.status(200).json(booking);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getBooking = getBooking;
