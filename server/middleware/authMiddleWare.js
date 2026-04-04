// middleware/authMiddleWare.js
import User from "../models/User.js";
import { getAuth } from "@clerk/clerk-sdk-node";

export const protect = async (req, res, next) => {
  try {
    const { userId } = getAuth(req); // Get Clerk ID

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authorized, token missing" });
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};