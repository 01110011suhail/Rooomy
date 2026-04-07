import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleWare.js";
import {
  createRoom,
  getRooms,
  getOwnerRooms,
  toggleRoomAvailability,
  checkAvailability,
} from "../controllers/roomController.js";

const roomRouter = express.Router();

// Create a new room (protected, with image upload)
roomRouter.post("/", protect, upload.array("images", 4), createRoom);

// Get all available rooms
roomRouter.get("/", getRooms);

// Get rooms for the current hotel owner (protected)
roomRouter.get("/owner", protect, getOwnerRooms);

// Toggle room availability (protected)
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);

// ✅ Check room availability for specific dates
roomRouter.post("/:id/check-availability", checkAvailability);

export default roomRouter;