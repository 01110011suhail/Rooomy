// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk ID
  email: { type: String, required: true },
  username: { type: String },
  role: { type: String, default: "user" }, // user or hotelOwner
  recentSearchCities: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.model("User", userSchema);