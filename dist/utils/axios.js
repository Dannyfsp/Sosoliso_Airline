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
exports.verifyTransaction = exports.initializeTransaction = exports.paystackInstance = void 0;
const axios_1 = __importDefault(require("axios"));
exports.paystackInstance = axios_1.default.create({
    baseURL: "https://api.paystack.co",
    headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
    },
});
function initializeTransaction(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "/transaction/initialize";
        return yield exports.paystackInstance.post(url, request);
    });
}
exports.initializeTransaction = initializeTransaction;
function verifyTransaction(paymentRef) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `/transaction/verify/${paymentRef}`;
        return yield exports.paystackInstance.get(url);
    });
}
exports.verifyTransaction = verifyTransaction;
