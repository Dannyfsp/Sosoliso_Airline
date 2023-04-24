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
exports.bookingService = void 0;
const db_1 = __importDefault(require("../../config/db"));
exports.bookingService = {
    addBooking: (flightId, passengerId, flightClass, numberOfSeats, seatNumber) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query(`INSERT INTO booking (flight_id, passenger_id, flight_class, number_of_seats, seat_number) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`, [flightId, passengerId, flightClass, numberOfSeats, seatNumber]);
        return result.rows[0];
    }),
    findSeatNumber: (seatNumber, classType) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query("SELECT * FROM booking WHERE seat_number = $1 AND flight_class = $2", [seatNumber, classType]);
        return result.rows[0];
    }),
    updateClassSeats: (classType, numberOfSeats, flightId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield db_1.default.query(`UPDATE flight SET ${classType} = ${classType} - ${numberOfSeats} WHERE id = $1`, [flightId]);
    }),
    flightAvailability: (classType) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query(`SELECT * FROM flight WHERE ${classType} = 0`);
        return result.rows[0];
    }),
    findBooking: (passengerId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query("SELECT * FROM booking WHERE passenger_id = $1", [passengerId]);
        return result.rows[0];
    }),
    bookingStatus: (passengerId, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        const sqlQuery = `SELECT b.*, pa.amount, pa.payment_ref, pa.payment_status FROM payment pa 
    JOIN booking b ON pa.booking_id = b.id WHERE b.passenger_id = $1 AND b.id = $2`;
        const result = yield db_1.default.query(sqlQuery, [passengerId, bookingId]);
        return result.rows[0];
    }),
};
