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
exports.authSerice = void 0;
const db_1 = __importDefault(require("../../config/db"));
exports.authSerice = {
    findByPK: (id, model) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query(`SELECT * FROM ${model} WHERE id = $1`, [
            id,
        ]);
        return result.rows[0];
    }),
    findByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query("SELECT * FROM passenger WHERE email = $1", [email]);
        return result.rows[0];
    }),
    addPassenger: (firstName, lastName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query("INSERT INTO passenger (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [firstName, lastName, email, password]);
        return result.rows[0];
    }),
    allFlight: (limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.query(`SELECT * FROM flight LIMIT ${limit} OFFSET ${offset}`);
        return result.rows;
    }),
};
