"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    if (!req.session.passenger)
        return res.status(403).json({ error: "Unauthorized 🔒🔒🔒" });
    req.passenger = req.session.passenger;
    next();
};
exports.authMiddleware = authMiddleware;
