"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const adminAuth = (req, res, next) => {
    if (req.session.passenger.roles !== "admin") {
        return res
            .status(403)
            .json({ message: "🔒🔒🔒 Unauthorized, you're not an admin" });
    }
    else {
        next();
    }
};
exports.adminAuth = adminAuth;
