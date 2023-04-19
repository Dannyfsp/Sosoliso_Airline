import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import redisClient from "./auth/config/redis";
import session from "express-session";
import connectRedis from "connect-redis";
import "./auth/config/db";

declare module "express-session" {
  export interface SessionData {
    passenger: any;
  }
}

redisClient.on("connect", () => {
  console.log("Redis is connected");
});
redisClient.on("error", (err) => {
  console.error(err);
});

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

app.use(express.json());
import { router as authRouter } from "./auth/routes/auth.route";

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the best Airline Application ever😊😊😊");
});

app.use("/api/v1", authRouter);

export default app;
