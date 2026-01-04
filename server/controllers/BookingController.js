import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';

//fucntion to check availabilty of room

const checkAvailability = async ( checkInDate, checkOutDate, room) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lt: checkOutDate },
            checkOutDate: { $gt: checkInDate },
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        console.error( error.message);
    }

}


//api to check room availability
//post /api/booking/check-availability
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { checkInDate, checkOutDate, room } = req.body;
        const isAvailable = await checkAvailability(checkInDate, checkOutDate, room);
        res.json({ success: true, isAvailable });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }   
}


//Api to create a booking
//post /api/booking/create
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;

        //before creating booking check availability
        const isAvailable = await checkAvailability( {checkInDate, checkOutDate, room});
        if(!isAvailable){
            return res.json({ success: false, message: "Room not available for the selected dates"});
        }

        //Get totalPrice from room model
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.priceperNight;

        //Calculate total price based on number of nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = Math.abs(checkOut.getTime() - checkIn.getTime());
        const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        totalPrice = totalPrice * numberOfNights;

        const booking = await Booking.create({
            room,
            user,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        });

        res.json({ success: true, message: "Booking created successfully" });

      } 
        catch (error) {
        console.error(error);
        res.json({ success: false, message: "failed to create booking" });
    }
}
//Api to get user bookings
//get /api/booking/user-bookings
export const getUserBookings = async (req, res) => {

    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user })
            .populate("room")
            .populate("hotel")
            .sort({ createdAt: -1 });   

        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: "failed to fetch bookings   " });
    }
}

export const getHotelBookings = async (req, res) => {
try {
        const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) {
        return res.json({ success: false, message: "No hotel found for this owner" });
    }
    const bookings = await Booking.find({ hotel: hotel._id }).populate("room hotel user").sort({ createdAt: -1 });

    //total boolkings
    const totalBookings = bookings.length;

    //total revenue
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
    res.json({ success: true, dashboardData: { bookings, totalBookings, totalRevenue } });
} catch (error) {
    res.json({ success: false, message: "failed to fetch hotel bookings" });
}
}