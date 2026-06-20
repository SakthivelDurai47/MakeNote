import Note from "../models/Note.js";

// to get all the notes from the database
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user.userId }).sort({
      createdAt: -1,
    }); // gets all the notes and sor them in decending order based on createdAt
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// to get a single note by using id from the database
export async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.userId,
    }); //gets id from the request body of the url
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in getNoteById", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// used to create a new note
export async function createNotes(req, res) {
  try {
    const { title, content, tags } = req.body; //gets title and content from the body
    const newNote = new Note({ title, content, tags, user: req.user.userId }); //creates a Note along with an user Id
    const createdNote = await newNote.save(); //saves the new note in database
    res.status(201).json(createdNote);
  } catch (error) {
    console.log("Error in createNotes", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//used to update a specific note using the id
export async function updateNotes(req, res) {
  try {
    const { title, content, tags } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      { title, content, tags },
      { new: true }, // returns the updated note
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in updateNotes", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// used to delete a specific note using the id
export async function deleteNotes(req, res) {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note Deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteNotes", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
