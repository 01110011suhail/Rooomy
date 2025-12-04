import React, { useState, useEffect } from "react";
import { facilityIcons, roomCommonData, roomsDummyData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { assets } from "../assets/assets";
import { useParams } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const roomData = roomsDummyData.find((room) => room._id === id);
    if (roomData) {
      setRoom(roomData);
      setMainImage(roomData.images[0]);
    }
  }, [id]);

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
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

        {/* Room Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className="ml-2">(200+ reviews)</p>
        </div>

        {/* Room Address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="location" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Room Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          {/* Left column — Main Image */}
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="main-room-img"
              className="w-full h-96 md:h-110 lg:h-80 xl:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Right column — Thumbnail Images */}
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images &&
              room.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt="room-thumbnail"
                  className={`w-full h-40 object-cover rounded-xl shadow-md cursor-pointer 
                                ${
                                  mainImage === image
                                    ? "outline outline-3 outline-orange-500"
                                    : ""
                                }`}
                />
              ))}
          </div>
        </div>
        {/* Room HighLight */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Price Section */}
          <p>${room.pricePerNight}/night</p>
        </div>

        {/* check in check out */}

        <form
          action=""
          className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
        >
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check-In
              </label>
              <input
                type="date"
                id="checkInDate"
                placeholder="Check-In"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check-Out
              </label>
              <input
                type="date"
                id="checkOutDate"
                placeholder="Check-Out"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
                type="number"
                id="guests"
                placeholder="0"
                className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
                min="0"
                onInput={(e) => {
                  if (e.target.value < 0) e.target.value = 0;
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull active:scale-95 transition-all
             text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4
             text-base cursor-pointer"
          >
            Check Availability
          </button>
        </form>
        {/* common Description */}
        <div className="mt-25 space-y-4">
                    {roomCommonData.map((spec, index) => (
          <div key={index} className="flex items-start gap-2">
            <img src={spec.icon} alt={`${spec.title}-icon`} className="w-6.5" />
            <div className="">
              <p className="text-base">{spec.title}</p>
              <p className="text-gray-600">{spec.description}</p>
            </div>
          </div>
        ))}
        </div>
<div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
  <p>
    Guests will be allocated on the ground floor to ensure a comfortable and convenient stay. 
    This arrangement allows easy access to the main entrance, reception area, and essential 
    facilities without the need to use stairs or elevators. It is especially helpful for 
    families with children, senior guests, or anyone carrying luggage. Our goal is to provide 
    a smooth and hassle-free experience from the moment you arrive. If you have any special 
    requests regarding accessibility or room preferences, please feel free to let us know.
  </p>
</div>
{/* Hosted By */}
        <div className="flex items-center gap-4 mt-10">
            <div className="flex gap-4">
                <img src={room.hotel.owner.image} alt="host" className="w-14 h-14 md:h-18 md:w-18 rounded-full"/>

                <div>
                    <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
                    <div className="flex items-center mt-1">
                        <StarRating />
                        <span className="ml-2 text-gray-500">(200+ reviews)</span>
                    </div>

                </div>
            </div>
            <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">Contact Now</button>
            </div>


      </div>
    )
  );
};

export default RoomDetails;
