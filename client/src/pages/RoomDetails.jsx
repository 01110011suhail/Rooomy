import React, { useState, useEffect } from "react";
import { facilityIcons, roomCommonData, roomsDummyData, assets } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useParams } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);

  // Date calculations
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

  // Fetch room data
  useEffect(() => {
    const roomData = roomsDummyData.find((r) => r._id === id);
    if (roomData) {
      setRoom(roomData);
      setMainImage(roomData.images?.[0] || null);
    }
  }, [id]);

  if (!room) {
    return <div className="py-32 text-center text-xl">Loading room details...</div>;
  }

  // Booking form submit
  const handleBooking = (e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    if (guests < 1) {
      alert("Guests must be at least 1.");
      return;
    }
    console.log("Booking:", { checkInDate, checkOutDate, guests });
  };

  return (
    <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32 space-y-10">

      {/* Room Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel.name}
          <span className="font-inter text-sm"> ({room.roomType})</span>
        </h1>
        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </p>
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

      {/* Highlights & Price */}
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
            <label htmlFor="checkInDate" className="font-medium">Check-In</label>
            <input
              type="date"
              id="checkInDate"
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
              min={minDateStr}
              max={maxDateStr}
              value={checkInDate}
              onChange={(e) => {
                setCheckInDate(e.target.value);
                if (checkOutDate && e.target.value > checkOutDate) setCheckOutDate("");
              }}
            />
          </div>

          <div className="w-px h-15 bg-gray-300/70 hidden md:block"></div>

          <div className="flex flex-col w-full md:w-auto">
            <label htmlFor="checkOutDate" className="font-medium">Check-Out</label>
            <input
              type="date"
              id="checkOutDate"
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
              min={checkInDate || minDateStr}
              max={maxDateStr}
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>

          <div className="w-px h-15 bg-gray-300/70 hidden md:block"></div>

          <div className="flex flex-col w-full md:w-auto">
            <label htmlFor="guests" className="font-medium">Guests</label>
            <input
              type="number"
              id="guests"
              min="1"
              className="max-w-[80px] rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              value={guests}
              required
              onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md md:px-10 py-3 w-full md:w-auto mt-4 md:mt-0"
        >
          Check Availability
        </button>
      </form>

      {/* Common Description */}
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

      {/* Info Section */}
      <div className="max-w-3xl border-y border-gray-300 my-10 py-10 text-gray-500">
        <p>
          Guests will be allocated on the ground floor to ensure a comfortable and convenient stay...
        </p>
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
            <p className="text-lg md:text-xl font-medium">Hosted by {room.hotel.owner.name}</p>
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
