import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// Create a new room
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) return res.json({ success: false, message: "Hotel not found" });

    const uploadedImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });
    const images = await Promise.all(uploadedImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });

    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all available rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true }).populate({
      path: "hotel",
      populate: { path: "owner", select: "image username" },
    }).sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get rooms for current hotel owner
export const getOwnerRooms = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) return res.json({ success: false, message: "Hotel not found" });

    const rooms = await Room.find({ hotel: hotel._id }).populate("hotel");
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Toggle room availability
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    if (!roomData) return res.json({ success: false, message: "Room not found" });

    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    res.json({ success: true, message: "Room availability updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ New: Check room availability
export const checkAvailability = async (req, res) => {
  try {
    const { id } = req.params; // Room ID from URL
    const { checkInDate, checkOutDate } = req.body;

    const room = await Room.findById(id);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    // For now, just return the isAvailable flag
    // You can later check bookings for the selected dates
    res.json({ success: true, isAvailable: room.isAvailable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};