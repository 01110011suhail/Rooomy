import express from 'express';
import { protect } from '../middleware/authMiddleWare.js';
import { registerHotel } from '../controllers/hotelController.js';
const hotelRouter = express.Router();

// Route to register a new hotel
hotelRouter.post('/register', protect, registerHotel);  
export default hotelRouter;