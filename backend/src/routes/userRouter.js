import express from "express";
import {
  createUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

//creates a router
const userRouter = express.Router();

//to handle various requests
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.delete("/", protect, deleteUser);

export default userRouter;
