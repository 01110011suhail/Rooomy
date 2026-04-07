import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

// ✅ Register hotel
export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;

    const existingHotel = await Hotel.findOne({ owner: req.user._id });
    if (existingHotel) {
      return res.status(400).json({
        success: false,
        message: "Hotel already registered",
      });
    }

    const hotel = await Hotel.create({
      name,
      address,
      contact,
      city,
      owner: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, {
      role: "hotelOwner",
    });

    res.status(201).json({
      success: true,
      message: "Hotel registered successfully",
      hotel,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get all hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("owner", "username email");
    res.json({ success: true, hotels });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get my hotel
export const getMyHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user._id });

    res.json({
      success: true,
      hotel,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};