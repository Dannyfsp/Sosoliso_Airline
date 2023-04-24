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
exports.paymentService = void 0;
const db_1 = __importDefault(require("../../config/db"));
exports.paymentService = {
    getFlightId: (passengerId, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query("SELECT flight_id, flight_class FROM booking WHERE passenger_id = $1 AND id = $2", [passengerId, bookingId]);
        return result.rows[0];
    }),
    getPrice: (flightId, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        const sqlQuery = `SELECT f.price_first_class, 
        f.price_business_class, 
        f.price_economy_class 
        FROM booking b JOIN flight f ON b.flight_id = $1 WHERE b.id = $2`;
        const result = yield db_1.default.query(sqlQuery, [flightId, bookingId]);
        return result.rows[0];
    }),
    addPayment: (bookingId, passengerId, paymentRef, amount) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query(`INSERT INTO payment (booking_id, passenger_id, payment_ref, amount) VALUES ($1, $2, $3, $4) RETURNING *`, [bookingId, passengerId, paymentRef, amount]);
        return result.rows[0];
    }),
    getPaymentInfo: (passengerId, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query("SELECT * FROM payment WHERE passenger_id = $1 AND booking_id = $2", [passengerId, bookingId]);
        return result.rows[0];
    }),
    updatePaymentStatus: (status, passengerId, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.default.query("UPDATE payment SET payment_status = $1 WHERE passenger_id = $2 AND booking_id = $3", [status, passengerId, bookingId]);
    }),
    confirmBookingId: (bookingId, passengerId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query("SELECT * FROM booking WHERE id = $1 AND passenger_id = $2", [bookingId, passengerId]);
        return result.rows[0];
    }),
};
