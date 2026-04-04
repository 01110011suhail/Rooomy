// controllers/hotelController.js
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const ownerClerkId = req.user.clerkId;

    // check if hotel already registered
    const existingHotel = await Hotel.findOne({ owner: req.user._id });
    if (existingHotel) {
      return res.status(400).json({ success: false, message: "Hotel already registered" });
    }

    // create hotel
    const hotel = await Hotel.create({ name, address, contact, city, owner: req.user._id });

    // update user role
    req.user.role = "hotelOwner";
    await req.user.save();

    res.status(201).json({ success: true, message: "Hotel registered successfully", hotel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET all hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("owner", "username email");
    res.json({ success: true, hotels });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};