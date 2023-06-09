import rateLimit from "express-rate-limit";

const signUpAndLoginLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 10, // Limit each IP to 5 create account requests per `window` (here, per hour)
  message:
    "Too many request created from this IP, please try again after an hour",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default signUpAndLoginLimiter;
