import mongoose from "mongoose";

//defines the structure of the data
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true, // ensures that each email is unique in the database
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // records updated and created timestamps
  },
);

// creates the model based on the schema
const User = mongoose.model("User", userSchema);

export default User;
