import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    city: { type: String, required: true },
    owner: { type: String, ref: "User", required: true }, // ✅ FIXED
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);