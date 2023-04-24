"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMiddleware = exports.registerMiddleware = void 0;
const registerMiddleware = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    switch (true) {
        case !firstName:
            return res.status(400).json({ message: "first name is required!" });
        case !lastName:
            return res.status(400).json({ message: "last name is required" });
        case !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
            return res.status(400).json({ message: "email is required" });
        case !password || password.length < 5:
            return res.status(400).json({
                message: "password is required and must be greater than 5 characters",
            });
        default:
            next();
    }
};
exports.registerMiddleware = registerMiddleware;
const loginMiddleware = (req, res, next) => {
    const { email, password } = req.body;
    switch (true) {
        case !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
            return res.status(400).json({ message: "email is required" });
        case !password || password.length < 5:
            return res.status(400).json({
                message: "password is required and must be greater than 5 characters",
            });
        default:
            next();
    }
};
exports.loginMiddleware = loginMiddleware;
