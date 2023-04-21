import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import redisClient from "./config/redis";
import session from "express-session";
import connectRedis from "connect-redis";
import "./config/db";
import { router as authRouter } from "./auth/routes/auth.route";
import { router as adminRouter } from "./admin/routes/admin.route";

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the best Airline Application ever😊😊😊");
});

app.use("/api/v1", authRouter);
app.use("/api/v1", adminRouter);

export default app;
