import React, { useState, useMemo } from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets.js";
import StarRating from "../components/StarRating";
import { useNavigate } from "react-router-dom";

const Checkbox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="radio"
      name="sortOption"
      checked={selected}
      onChange={() => onChange(label)}
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);

  // -----------------------
  // FILTER STATE
  // -----------------------
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");

  // Filter options
  const roomTypes = ["Single Room", "Double Room", "Deluxe Room", "Family Suite"];
  const priceRanges = ["0 to 500", "500 to 1000", "1000 to 2000", "2000 to 3000"];
  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Rating: High to Low",
    "Rating: Low to High",
    "Newest First",
  ];

  // Helper to parse price range
  const parseRange = (range) => {
    const [min, max] = range.split(" to ").map(Number);
    return { min, max };
  };

  // -----------------------
  // UPDATE FILTER FUNCTIONS
  // -----------------------
  const toggleRoomType = (checked, label) => {
    setSelectedRoomTypes((prev) =>
      checked ? [...prev, label] : prev.filter((item) => item !== label)
    );
  };

  const togglePriceRange = (checked, label) => {
    const cleanLabel = label.replace("$ ", "");
    setSelectedPriceRanges((prev) =>
      checked ? [...prev, cleanLabel] : prev.filter((item) => item !== cleanLabel)
    );
  };

  const clearFilters = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRanges([]);
    setSelectedSort("");
  };

  // -----------------------
  // FILTER + SORT LOGIC
  // -----------------------
  const filteredRooms = useMemo(() => {
    let filtered = [...roomsDummyData];

    if (selectedRoomTypes.length > 0) {
      filtered = filtered.filter((room) =>
        selectedRoomTypes.includes(room.roomType)
      );
    }

    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((room) =>
        selectedPriceRanges.some((range) => {
          const { min, max } = parseRange(range);
          return room.pricePerNight >= min && room.pricePerNight <= max;
        })
      );
    }

    switch (selectedSort) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case "Rating: High to Low":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "Rating: Low to High":
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case "Newest First":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedRoomTypes, selectedPriceRanges, selectedSort]);

  return (
    <div className="flex flex-col lg:flex-row pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 gap-8">

      {/* RIGHT (Mobile First): Filter Box */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 
        max-lg:mb-8 lg:mt-16 rounded-lg order-1 lg:order-2">

        <div
          className={`flex items-center justify-between px-5 py-2.5 border-gray-300 ${
            openFilter ? "border-b" : ""
          }`}
        >
          <p className="text-base font-medium text-gray-800">FILTERS</p>

          <div className="text-xs cursor-pointer">
            <span onClick={() => setOpenFilter(!openFilter)} className="lg:hidden">
              {openFilter ? "HIDE" : "SHOW"}
            </span>
            <span className="hidden lg:block" onClick={clearFilters}>
              CLEAR
            </span>
          </div>
        </div>

        <div
          className={`${
            openFilter ? "h-auto" : "h-0 lg:h-auto"
          } overflow-hidden transition-all duration-700`}
        >
          {/* Room Types */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
            {roomTypes.map((room, index) => (
              <Checkbox
                key={index}
                label={room}
                selected={selectedRoomTypes.includes(room)}
                onChange={toggleRoomType}
              />
            ))}
          </div>

          {/* Price */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <Checkbox
                key={index}
                label={`$ ${range}`}
                selected={selectedPriceRanges.includes(range)}
                onChange={togglePriceRange}
              />
            ))}
          </div>

          {/* Sort */}
          <div className="px-5 pt-5 pb-5">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSort === option}
                onChange={setSelectedSort}
              />
            ))}
          </div>
        </div>
      </div>

      {/* LEFT: Room List */}
      <div className="flex flex-col lg:w-3/4 order-2 lg:order-1">
        <div className="flex flex-col items-start text-left mb-6">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            Take Advantage of our Limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        {/* Room List */}
        <div className="flex flex-col gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
            >
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                src={room.images[0]}
                alt="hotel-img"
                className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
              />

              <div className="md:w-1/2 flex flex-col gap-2">
                <p className="text-gray-500">{room.hotel.city}</p>

                <p
                  className="text-gray-800 text-3xl font-playfair cursor-pointer"
                  onClick={() => navigate(`/rooms/${room._id}`)}
                >
                  {room.hotel.name}
                </p>

                <div className="flex items-center">
                  <StarRating />
                  <p className="ml-2">200+ reviews</p>
                </div>

                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                  <img src={assets.locationIcon} alt="location" />
                  <span>{room.hotel.address}</span>
                </div>

                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                    >
                      <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xl font-medium text-gray-700">
                  ${room.pricePerNight}/night
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AllRooms;
