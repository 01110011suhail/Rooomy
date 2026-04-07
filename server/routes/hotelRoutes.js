// routes/hotelRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import {
  registerHotel,
  getHotels,
  getMyHotel, // ✅ ADD
} from "../controllers/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.post("/register", protect, registerHotel);
hotelRouter.get("/", getHotels);

// ✅ NEW ROUTE
hotelRouter.get("/my-hotel", protect, getMyHotel);

export default hotelRouter;