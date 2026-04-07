import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={'/rooms/' + room._id}
      onClick={() => scrollTo(0, 0)}
      key={room._id}
      className="relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2"
    >
      {/* Image with subtle hover zoom */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={room.images[0]}
          alt={room.hotel.name}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
        {index % 2 === 0 && (
          <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-yellow-400 text-white font-semibold rounded-full shadow-md">
            Best Seller
          </p>
        )}
      </div>

      {/* Card content */}
      <div className="p-4 pt-5">
        <div className="flex items-center justify-between">
          <p className="font-playfair text-xl font-semibold text-gray-800">
            {room.hotel.name}
          </p>
          <div className="flex items-center gap-1">
            <img src={assets.starIconFilled} alt="star-icon" className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700">4.5</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm mt-2 text-gray-600">
          <img src={assets.locationFilledIcon} alt="location-icon" className="w-4 h-4" />
          <span>{room.hotel.address}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p>
            <span className="text-xl text-gray-800 font-semibold">${room.pricePerNight}</span>/night
          </p>
          <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition-all cursor-pointer shadow-sm hover:shadow-md">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;