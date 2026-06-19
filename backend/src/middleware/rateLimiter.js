import rateLimit from "../config/upstash.js";

// acts as a middleware to check if the rate limit is exceeded or not
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("usage-limit"); // checks for the success value
    if (!success) {
      return res.status(429).json({
        message: "Too Many requests, Please try again",
      });
    }

    next(); // if there is no problem, the program goes to the next functions
  } catch (error) {
    console.log("error in rateLimiting", error);
    next();
  }
};

export default rateLimiter;
