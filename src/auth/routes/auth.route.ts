import { Router } from "express";
import {
  passengerSignIn,
  passengerSignUp,
} from "../controllers/auth.controller";
import { loginMiddleware, registerMiddleware } from "../middleware/validate";

export const router: Router = Router();

router.post("/auth/signup", registerMiddleware, passengerSignUp);
router.post("/auth/login", loginMiddleware, passengerSignIn);
