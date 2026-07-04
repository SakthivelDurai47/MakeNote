import express from "express";
import {
  createNotes,
  deleteNotes,
  getAllNotes,
  getNoteById,
  updateNotes,
  togglePin,
} from "../controllers/notesController.js";
import { protect } from "../middleware/authMiddleware.js";

//creates a router
const noteRouter = express.Router();

//to handle various requests
noteRouter.get("/", protect, getAllNotes);
noteRouter.get("/:id", protect, getNoteById);
noteRouter.post("/", protect, createNotes);
noteRouter.put("/:id", protect, updateNotes);
noteRouter.delete("/:id", protect, deleteNotes);
noteRouter.patch("/:id/pin", protect, togglePin);

export default noteRouter;
