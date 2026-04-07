import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import StarRating from "../components/StarRating";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, axios, getToken, navigate } = useAppContext();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  // Date limits
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 45);

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const minDateStr = formatDate(today);
  const maxDateStr = formatDate(maxDate);

  // Fetch room from context
  useEffect(() => {
    const roomData = rooms.find((r) => r._id === id);
    if (roomData) {
      setRoom(roomData);
      setMainImage(roomData.images?.[0] || null);
    }
  }, [rooms, id]);

  if (!room) return <div className="py-32 text-center text-xl">Loading room details...</div>;

  // Check room availability
  const checkAvailability = async () => {
    if (!checkInDate || !checkOutDate) return toast.error("Please select both check-in and check-out dates.");

    try {
      const { data } = await axios.post(`/api/rooms/${id}/check-availability`, { checkInDate, checkOutDate });
      setIsAvailable(data.isAvailable);
      if (data.isAvailable) toast.success("Room is available!");
      else toast.error("Room is not available for the selected dates.");
    } catch (error) {
      console.error("Error checking availability:", error);
      toast.error("Failed to check availability.");
    }
  };

  // Booking handler
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!checkInDate || !checkOutDate) return toast.error("Select both check-in and check-out dates.");
    if (!isAvailable) return checkAvailability();

    try {
      const token = await getToken();
      const { data } = await axios.post(
        `/api/rooms/book`,
        { roomId: id, checkInDate, checkOutDate, guests, paymentMethod: "pay at hotel" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Booking successful!");
        navigate("/my-bookings");
        window.scrollTo(0, 0);
      } else {
        toast.error(data.message || "Failed to book the room.");
      }
    } catch (error) {
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32 space-y-10">
      {/* Room Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel.name} <span className="font-inter text-sm">({room.roomType})</span>
        </h1>
        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">20% OFF</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-2">
        <StarRating />
        <p className="ml-2 text-gray-500">(200+ reviews)</p>
      </div>

      {/* Address */}
      <div className="flex items-center gap-1 text-gray-500 mt-2">
        <img src={assets.locationIcon} alt="location-icon" className="w-4 h-4" />
        <span>{room.hotel.address}</span>
      </div>

      {/* Image Gallery */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          <img
            src={mainImage}
            alt="room main"
            className="w-full h-96 md:h-[440px] lg:h-80 xl:h-96 object-cover rounded-xl shadow-lg"
            loading="lazy"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumbnail-${idx}`}
              onClick={() => setMainImage(img)}
              loading="lazy"
              className={`w-full h-40 object-cover rounded-xl shadow-md cursor-pointer transition-all duration-300
                ${mainImage === img ? "outline outline-3 outline-orange-500" : ""}
              `}
            />
          ))}
        </div>
      </div>

      {/* Amenities & Price */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10 items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-playfair">Experience Luxury Like Never Before</h2>
          <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
            {room.amenities.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                {facilityIcons[item] && <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />}
                <p className="text-xs">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-2xl font-semibold">${room.pricePerNight}/night</p>
      </div>

      {/* Booking Form */}
      <form
        onSubmit={handleBooking}
        className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-lg p-6 rounded-xl mx-auto mt-10 max-w-6xl gap-6"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500 w-full">
          <div className="flex flex-col w-full md:w-auto">
            <label className="font-medium">Check-In</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              min={minDateStr}
              max={maxDateStr}
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />
          </div>

          <div className="w-px h-15 bg-gray-300/70 hidden md:block"></div>

          <div className="flex flex-col w-full md:w-auto">
            <label className="font-medium">Check-Out</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              min={checkInDate || minDateStr}
              max={maxDateStr}
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              disabled={!checkInDate}
              required
            />
          </div>

          <div className="w-px h-15 bg-gray-300/70 hidden md:block"></div>

          <div className="flex flex-col w-full md:w-auto">
            <label className="font-medium">Guests</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="max-w-[80px] rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md md:px-10 py-3 w-full md:w-auto mt-4 md:mt-0"
        >
          {isAvailable ? "Book Now" : "Check Availability"}
        </button>
      </form>

      {/* Common Room Description */}
      <div className="space-y-4">
        {roomCommonData.map((spec, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <img src={spec.icon} alt={`${spec.title}-icon`} className="w-6 h-6" />
            <div>
              <p className="text-base font-medium">{spec.title}</p>
              <p className="text-gray-600">{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hosted By Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-10">
        <div className="flex gap-4 items-center">
          <img
            src={room.hotel.owner.image}
            alt="host"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
          />
          <div>
            <p className="text-lg md:text-xl font-medium">Hosted by {room.hotel.owner.username}</p>
            <div className="flex items-center mt-1">
              <StarRating />
              <span className="ml-2 text-gray-500">(200+ reviews)</span>
            </div>
          </div>
        </div>
        <button className="px-6 py-2.5 mt-4 md:mt-0 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">
          Contact Now
        </button>
      </div>
    </div>
  );
};

export default RoomDetails;