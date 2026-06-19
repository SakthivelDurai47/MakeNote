import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// creaes a rateLimiter that only allows 100 requests per 60 sec
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(), //gets env values
  limiter: Ratelimit.slidingWindow(10, "60 s"),
});

export default rateLimit;
