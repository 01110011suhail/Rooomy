import User from "../models/User.js";
import { getAuth, clerkClient } from "@clerk/express";

export const protect = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    let user = await User.findOne({ clerkId: userId });

    // ✅ CREATE USER IF NOT EXISTS
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);

      user = await User.create({
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        username: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
        role: "user",
        recentSearchCities: [],
      });

      console.log("✅ New user created");
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};