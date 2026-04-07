import React, { useState, useEffect } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext.jsx";

const Hero = () => {
  const today = new Date().toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(today);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [destination, setDestination] = useState("");

  const { navigate, getToken, axios, setSearchCities } = useAppContext();

  // Background slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % assets.heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();

    // Navigate to rooms page
    navigate(`/rooms?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}`);

    try {
      // Store recent searched city
      const token = await getToken();
      await axios.post(
        "/api/user/store-recent-search",
        { recentSearchedCity: destination },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSearchCities((prevSearchCities) => {
        const updated = [destination, ...prevSearchCities.filter((c) => c !== destination)];
        return updated.slice(0, 5); // Keep last 5 cities
      });
    } catch (error) {
      console.error("Error storing recent search:", error);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden text-white">
      {/* Slider Container */}
      <div
        className="absolute top-0 left-0 flex h-full w-full transition-transform duration-1000 will-change-transform"
        style={{ transform: `translateX(-${currentBgIndex * 100}%)` }}
      >
        {assets.heroImages.map((img, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 h-full">
        <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">Escape in Style</p>
        <h1 className="font-playfair text-2xl md:text-5xl lg:text-[56px] font-bold md:font-extrabold max-w-xl mt-4">
          A Stay You’ll Never Forget
        </h1>
        <p className="max-w-[520px] mt-2 text-sm md:text-base">
          Experience luxury, comfort, and serenity all in one place. Your perfect getaway starts here.
        </p>

        {/* Search Form */}
        <form
          onSubmit={onSearch}
          className="bg-white/70 backdrop-blur-md text-gray-700 rounded-2xl px-6 md:px-8 py-6 mt-10 flex flex-col md:flex-row gap-4 md:gap-6 shadow-2xl max-w-5xl mx-auto transition-all duration-300"
        >
          {/* Destination */}
          <div className="flex-1 relative">
            <label htmlFor="destinationInput" className="absolute -top-3 left-4 bg-white/70 px-1 text-gray-600 text-sm font-medium">Destination</label>
            <img src={assets.calenderIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 opacity-70 pointer-events-none" />
            <input
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
              list="destinations"
              id="destinationInput"
              type="text"
              className="w-full rounded-xl border border-gray-200 bg-white/50 px-10 py-3 text-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="Where to?"
              required
              aria-label="Destination"
            />
            <datalist id="destinations">
              {cities.map((city, index) => (
                <option value={city} key={index} />
              ))}
            </datalist>
          </div>

          {/* Check-in */}
          <div className="flex-1 relative">
            <label htmlFor="checkIn" className="absolute -top-3 left-4 bg-white/70 px-1 text-gray-600 text-sm font-medium">Check in</label>
            <img src={assets.calenderIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 opacity-70 pointer-events-none" />
            <input
              id="checkIn"
              type="date"
              className="w-full rounded-xl border border-gray-200 bg-white/50 px-10 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              value={checkIn}
              min={today}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (e.target.value > checkOut) setCheckOut(e.target.value);
              }}
            />
          </div>

          {/* Check-out */}
          <div className="flex-1 relative">
            <label htmlFor="checkOut" className="absolute -top-3 left-4 bg-white/70 px-1 text-gray-600 text-sm font-medium">Check out</label>
            <img src={assets.calenderIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 opacity-70 pointer-events-none" />
            <input
              id="checkOut"
              type="date"
              className="w-full rounded-xl border border-gray-200 bg-white/50 px-10 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          {/* Guests */}
          <div className="flex-1 relative">
            <label htmlFor="guests" className="absolute -top-3 left-4 bg-white/70 px-1 text-gray-600 text-sm font-medium">Guests</label>
            <input
              min={1}
              max={4}
              id="guests"
              type="number"
              className="w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              defaultValue={1}
              aria-label="Number of guests"
            />
          </div>

          {/* Search Button */}
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 px-6 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full md:w-auto">
            <img src={assets.searchIcon} alt="" className="h-6" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;