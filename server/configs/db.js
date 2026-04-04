import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Database Connected"));
    mongoose.connection.on("error", (err) => console.log("Database connection error:", err));

    // Connect using only the URI
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connection successful!");
  } catch (error) {
    console.log("Connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;