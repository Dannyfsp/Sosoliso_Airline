import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import "./auth/config/db";

const app: Express = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the best Airline Application ever😊😊😊");
});

export default app;
