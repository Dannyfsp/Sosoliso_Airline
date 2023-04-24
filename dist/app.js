"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const redis_1 = __importDefault(require("./config/redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const auth_route_1 = require("./auth/routes/auth.route");
const admin_route_1 = require("./admin/routes/admin.route");
const booking_route_1 = require("./booking/routes/booking.route");
const payment_route_1 = require("./payment/routes/payment.route");
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
const store = new RedisStore({ client: redis_1.default });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, express_session_1.default)({
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: 600000,
        secure: false,
        httpOnly: true,
    },
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Welcome to Sosoliso");
});
app.get("/welcome", (req, res) => {
    res
        .status(200)
        .send("Thank you for your payment 😊, please check your email for receipt");
});
app.use("/api/v1", auth_route_1.router);
app.use("/api/v1", admin_route_1.router);
app.use("/api/v1", booking_route_1.router);
app.use("/api/v1", payment_route_1.router);
app.use("*", (req, res) => {
    return res
        .status(404)
        .json({ message: "oops... The page you're looking for does not exist" });
});
exports.default = app;
