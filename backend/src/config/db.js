import mongoose from "mongoose";

// tp connect with the database
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // connects to the database using the database uri from env
    console.log("Database Connected Successfully");
  } catch (e) {
    console.error("Error while connecting to DB: ", e);
    process.exit(1); //exit with failure, 0 for success
  }
};
