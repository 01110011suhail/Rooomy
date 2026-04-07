import React, { useState, useMemo } from "react";
import StarRating from "../components/StarRating";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

// ---------------- UI COMPONENTS ----------------
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

// ---------------- MAIN COMPONENT ----------------
const AllRooms = () => {
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const { rooms, currency } = useAppContext();

  const [openFilter, setOpenFilter] = useState(false);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");

  // ---------------- OPTIONS ----------------
  const roomTypes = ["Single Room", "Double Room", "Deluxe Room", "Family Suite"];
  const priceRanges = ["0 to 500", "500 to 1000", "1000 to 2000", "2000 to 3000"];
  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Rating: High to Low",
    "Rating: Low to High",
    "Newest First",
  ];

  // ---------------- HELPERS ----------------
  const parseRange = (range) => {
    const [min, max] = range.split(" to ").map(Number);
    return { min, max };
  };

  const toggleRoomType = (checked, label) => {
    setSelectedRoomTypes((prev) =>
      checked ? [...prev, label] : prev.filter((item) => item !== label)
    );
  };

  const togglePriceRange = (checked, label) => {
    const cleanLabel = label.replace(`${currency} `, "");
    setSelectedPriceRanges((prev) =>
      checked ? [...prev, cleanLabel] : prev.filter((item) => item !== cleanLabel)
    );
  };

  const clearFilters = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRanges([]);
    setSelectedSort("");
    setSearchParam({});
  };

  // ---------------- FILTER + SORT ----------------
  const filteredRooms = useMemo(() => {
    let filtered = [...rooms];

    // Destination filter
    const destination = searchParam.get("destination");
    if (destination) {
      filtered = filtered.filter((room) =>
        room.hotel.city.toLowerCase().includes(destination.toLowerCase())
      );
    }

    // Room type filter
    if (selectedRoomTypes.length > 0) {
      filtered = filtered.filter((room) =>
        selectedRoomTypes.includes(room.roomType)
      );
    }

    // Price filter
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((room) =>
        selectedPriceRanges.some((range) => {
          const { min, max } = parseRange(range);
          return room.pricePerNight >= min && room.pricePerNight <= max;
        })
      );
    }

    // Sorting
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
  }, [rooms, selectedRoomTypes, selectedPriceRanges, selectedSort, searchParam]);

  return (
    <div className="flex flex-col lg:flex-row pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 gap-8">

      {/* FILTER SECTION */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 
        max-lg:mb-8 lg:mt-16 rounded-lg order-1 lg:order-2">

        <div className={`flex items-center justify-between px-5 py-2.5 ${openFilter ? "border-b" : ""}`}>
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

        <div className={`${openFilter ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all`}>

          {/* Room Types */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Room Type</p>
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
                label={`${currency} ${range}`}
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

      {/* ROOMS LIST */}
      <div className="flex flex-col lg:w-3/4 order-2 lg:order-1">

        <div className="mb-6">
          <h1 className="text-4xl font-playfair">Hotel Rooms</h1>
          <p className="text-gray-500 mt-2">
            Discover amazing stays tailored to your preferences.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {filteredRooms.map((room) => (
            <div key={room._id} className="flex flex-col md:flex-row gap-6 border-b pb-6">

              <img
                src={room.images[0]}
                className="md:w-1/2 rounded-xl cursor-pointer"
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  window.scrollTo(0, 0);
                }}
              />

              <div className="md:w-1/2 flex flex-col gap-2">
                <p className="text-gray-500">{room.hotel.city}</p>
                <h2 className="text-2xl font-semibold">{room.hotel.name}</h2>

                <div className="flex items-center gap-2">
                  <StarRating rating={room.rating} />
                  <span>{room.rating}</span>
                </div>

                <p className="text-sm text-gray-500">{room.hotel.address}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {room.amenities.map((item, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </div>

                <p className="text-xl font-bold mt-2">
                  {currency} {room.pricePerNight}/night
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