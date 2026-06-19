import mongoose from "mongoose";

//defines the structure of the data
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // records updated and created timestamps
  },
);

// creates the model based on the schema
const Note = mongoose.model("Note", noteSchema);

export default Note;
