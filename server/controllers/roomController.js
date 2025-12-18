import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//api to create a new room for a hotel
export const createRoom = async (req, res) => {
    try{
        const {roomType,priceperNight, amenities} = req.body;
        const hotel = await Hotel.findOne({owner: req.auth.user._id});

        if(!hotel){
            return res.json({success: false, message: "Hotel not found"});
        };
        //upload images to cloudinary
        const uploadedImages = req.files.map(async(file) => {
            const response =  await cloudinary.uploader.upload(file.path);
            return response.secure_url;

            //upload to cloudinary
        })
        //wait for all images to be uploaded
        const images = await Promise.all(uploadedImages);

        await Room.create({
            hotel: hotel._id,
            roomType,
            priceperNight: +priceperNight,
            amenities: JSON.parse(amenities),
            images,
        });
        res.json({success: true, message: "Room created successfully"});
    }catch(error){
        res.json({success: false, message: error.message});


    }

}


//API to get all rooms of a hotel
export const getHotelRooms = async (req, res) => {

}

//API to get room for a specific uhotel
export const getOwnerRooms = async (req, res) => {    

}

//API to get togglle room availability
export const toggleRoomAvailability = async (req, res) => {    

}