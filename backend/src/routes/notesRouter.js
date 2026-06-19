import express from "express";
import {
  createNotes,
  deleteNotes,
  getAllNotes,
  getNoteById,
  updateNotes,
} from "../controllers/notesController.js";

//creates a router
const router = express.Router();

//to handle various requests
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router;
