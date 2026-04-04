import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import { registerHotel, getHotels } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.post("/register", protect, registerHotel);
hotelRouter.get("/", getHotels);

export default hotelRouter;