import express from 'express';
import { protect } from '../middleware/authMiddleWare.js';
import { createBooking, getUserBookings, checkAvailabilityAPI, getHotelBookings } from '../controllers/BookingController.js';

const bookingRouter = express.Router();

// Check room availability
bookingRouter.post('/check-availability', checkAvailabilityAPI);

// Create a booking (protected)
bookingRouter.post('/book', protect, createBooking);

// Get user bookings (protected)
bookingRouter.get('/user', protect, getUserBookings);

// Get hotel bookings for hotel owner (protected)
bookingRouter.get('/hotel', protect, getHotelBookings);

export default bookingRouter;