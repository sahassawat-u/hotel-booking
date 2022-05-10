import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

export default connectDB;
