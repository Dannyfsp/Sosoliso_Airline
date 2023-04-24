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
exports.adminService = void 0;
const db_1 = __importDefault(require("../../config/db"));
exports.adminService = {
    addFlight: (departureTerminalId, arrivalTerminalId, flightType, departureDateTime, arrivalDateTime, availableSeatsFirstClass, priceFirstClass, availableSeatsBusinessClass, priceBusinessClass, availableSeatsEconomyClass, priceEconomyClass) => __awaiter(void 0, void 0, void 0, function* () {
        let queries = `INSERT INTO flight (
        departure_terminal_id, 
        arrival_terminal_id, 
        flight_type, departure_date_time, 
        arrival_date_time, 
        available_seats_first_class, 
        price_first_class, 
        available_seats_business_class, 
        price_business_class, 
        available_seats_economy_class, 
        price_economy_class) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *`;
        let values = [
            departureTerminalId,
            arrivalTerminalId,
            flightType,
            departureDateTime,
            arrivalDateTime,
            availableSeatsFirstClass,
            priceFirstClass,
            availableSeatsBusinessClass,
            priceBusinessClass,
            availableSeatsEconomyClass,
            priceEconomyClass,
        ];
        const result = yield db_1.default.query(queries, values);
        return result.rows[0];
    }),
    getAll: (model) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query(`SELECT * FROM ${model}`);
        return result.rows;
    }),
    getCancelledFlight: () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query("SELECT * FROM booking WHERE is_cancelled = true");
        return result.rows;
    }),
};
