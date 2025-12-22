import express from 'express';
import { protect } from '../middleware/authMiddleWare.js';
import { createBooking, getUserBookings, checkAvailabilityAPI, getHotelBookings } from '../controllers/BookingController.js';
const bookingRouter = express.Router();

// Route to create a new booking
bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect, getHotelBookings); // Example for hotel bookings, adjust as needed
 

export default bookingRouter;