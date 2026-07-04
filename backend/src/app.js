import express from "express";
import noteRouter from "./routes/notesRouter.js";
import userRouter from "./routes/userRouter.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

//used to read the .env file
dotenv.config();

//creates an express app
const app = express();

//gets the port no from the env, if not present uses 3000
const port = process.env.PORT || 3000;

const __dirname = path.resolve();

//middleware

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}

app.use(express.json()); // used to parse the JSON body, must need to access req.body
app.use(rateLimiter); // used to set rate limit to the requests

//routes to handle http requests
app.use("/api/notes", noteRouter);
app.use("/api/users", userRouter);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

//connecting to database
connectDB().then(() => {
  //once database is connected, the app statrs listening in port
  app.listen(port, () => {
    console.log("Server is running on port", port);
  });
});
