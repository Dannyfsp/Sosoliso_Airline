import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import redisClient from "./config/redis";
import session from "express-session";
import connectRedis from "connect-redis";
import pool from "./config/db";
import { router as authRouter } from "./auth/routes/auth.route";
import { router as adminRouter } from "./admin/routes/admin.route";
import { router as bookingRouter } from "./booking/routes/booking.route";
import { router as paymentRouter } from "./payment/routes/payment.route";

declare module "express-session" {
  export interface SessionData {
    passenger: any;
  }
}

const RedisStore = connectRedis(session);

const store = new RedisStore({ client: redisClient });

const app: Express = express();

app.use(cors());
app.use(helmet());

app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 600000,
      secure: false,
      httpOnly: true,
    },
  })
);

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    console.log("Database Connected, Current timestamp:", res.rows[0].now);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the best Airline Application ever😊😊😊");
});

app.use("/api/v1", authRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", bookingRouter);
app.use("/api/v1", paymentRouter);

export default app;
