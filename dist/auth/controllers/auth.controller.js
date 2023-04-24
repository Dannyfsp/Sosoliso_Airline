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
exports.getAFlight = exports.allFlights = exports.passengerLogout = exports.passengerSignIn = exports.passengerSignUp = void 0;
const auth_service_1 = require("../services/auth.service");
const bcrypt_1 = require("../../utils/bcrypt");
const admin_service_1 = require("../../admin/services/admin.service");
const passengerSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstName, lastName, email, password } = req.body;
    try {
        const userExist = yield auth_service_1.authSerice.findByEmail(email);
        if (userExist)
            return res
                .status(400)
                .json({ message: "User already exist, please login" });
        let hashPassword = yield bcrypt_1.hash.hashPwd(password);
        password = hashPassword;
        const passenger = yield auth_service_1.authSerice.addPassenger(firstName, lastName, email, password);
        delete passenger.password;
        delete passenger.roles;
        delete passenger.created_at;
        return res
            .status(201)
            .json({ message: "passenger created successfully", passenger });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.passengerSignUp = passengerSignUp;
const passengerSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    try {
        let passenger = yield auth_service_1.authSerice.findByEmail(email);
        if (!passenger)
            return res
                .status(400)
                .json({ message: "User does exist, please sign up" });
        const correctPassword = yield bcrypt_1.hash.comparePassword(password, passenger.password);
        if (!correctPassword)
            return res.status(400).json({ message: "password mismatched" });
        req.session.passenger = passenger;
        return res.status(200).json({
            message: "user logged in successfully",
            user: req.session.passenger.id,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.passengerSignIn = passengerSignIn;
const passengerLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res.status(200).json({ message: "user logged out successfully" }));
                }
            });
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.passengerLogout = passengerLogout;
const allFlights = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page);
    const limit = 5;
    const offset = (page - 1) * limit;
    try {
        if (page) {
            const pagination = yield auth_service_1.authSerice.allFlight(limit, offset);
            if (pagination.length <= 0)
                return res.status(400).json({ message: "No flights for this page" });
            else
                return res.status(200).json(pagination);
        }
        const data = yield admin_service_1.adminService.getAll("flight");
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.allFlights = allFlights;
const getAFlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const flightId = req.params.flightId;
    try {
        const result = yield auth_service_1.authSerice.findByPK(Number(flightId), "flight");
        if (!result)
            return res
                .status(400)
                .json({ message: `flight with the id ${flightId} does not exist` });
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAFlight = getAFlight;
