import React, { useState, useEffect } from "react";
import { facilityIcons, assets, roomCommonData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();

  const { axios, getToken, user, rooms, navigate } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);

  const [isAvailable, setIsAvailable] = useState(false);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // ------------------ Fetch User Bookings ------------------
  const fetchUserBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message || "Failed to fetch bookings.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  // ------------------ Load Room ------------------
  useEffect(() => {
    const roomData = rooms.find((r) => r._id === id);
    if (roomData) {
      setRoom(roomData);
      setMainImage(roomData.images?.[0] || null);
    }
  }, [rooms, id]);

  // ------------------ Date Helpers ------------------
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

  // ------------------ Check Availability ------------------
  const checkAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Select both dates");
      return;
    }

    setLoadingAvailability(true);

    try {
      const { data } = await axios.post("/api/rooms/check-availability", {
        roomId: id,
        checkInDate,
        checkOutDate,
      });

      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room available!");
        } else {
          setIsAvailable(false);
          toast.error("Room not available");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Availability check failed");
    } finally {
      setLoadingAvailability(false);
    }
  };

  // ------------------ Auto Check (Optional UX Boost) ------------------
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      setIsAvailable(false);
    }
  }, [checkInDate, checkOutDate]);

  // ------------------ Booking Submit ------------------
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!checkInDate || !checkOutDate) {
      toast.error("Select dates first");
      return;
    }

    if (!isAvailable) {
      await checkAvailability();
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/bookings/book",
        {
          roomId: id,
          checkInDate,
          checkOutDate,
          guests,
          paymentMethod: "pay at hotel",
        },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        toast.success("Booking successful!");
        navigate("/my-bookings");
        window.scrollTo(0, 0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Booking failed");
    }
  };

  // ------------------ Loading ------------------
  if (!room) {
    return (
      <div className="py-32 text-center text-xl">
        Loading room details...
      </div>
    );
  }

  // ------------------ UI ------------------
  return (
    <div className="py-28 px-4 md:px-16 lg:px-24 xl:px-32 space-y-10">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-playfair">
        {room.hotel.name}
        <span className="text-sm ml-2">({room.roomType})</span>
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <StarRating />
        <span className="text-gray-500">(200+ reviews)</span>
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 text-gray-500">
        <img src={assets.locationIcon} className="w-4" />
        {room.hotel.address}
      </div>

      {/* Images */}
      <div className="flex flex-col lg:flex-row gap-6">
        <img
          src={mainImage}
          className="w-full lg:w-1/2 h-96 object-cover rounded-xl"
        />

        <div className="grid grid-cols-2 gap-4 lg:w-1/2">
          {room.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setMainImage(img)}
              className={`h-40 object-cover rounded cursor-pointer ${
                mainImage === img ? "outline outline-2 outline-orange-500" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Amenities</h2>
        <div className="flex flex-wrap gap-3">
          {room.amenities.map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded">
              {facilityIcons[item] && (
                <img src={facilityIcons[item]} className="w-5" />
              )}
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <p className="text-2xl font-bold">${room.pricePerNight}/night</p>

      {/* Booking Form */}
      <form onSubmit={onSubmitHandler} className="bg-white shadow p-6 rounded flex flex-col md:flex-row gap-4">

        <input
          type="date"
          value={checkInDate}
          min={minDateStr}
          max={maxDateStr}
          onChange={(e) => {
            setCheckInDate(e.target.value);
            setIsAvailable(false);
          }}
        />

        <input
          type="date"
          value={checkOutDate}
          min={checkInDate || minDateStr}
          max={maxDateStr}
          disabled={!checkInDate}
          onChange={(e) => {
            setCheckOutDate(e.target.value);
            setIsAvailable(false);
          }}
        />

        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        />

        <button className="bg-primary text-white px-6 py-2 rounded">
          {isAvailable ? "Book Now" : "Check Availability"}
        </button>
      </form>

      {/* Extra Info */}
      <div className="space-y-4">
        {roomCommonData.map((item, i) => (
          <div key={i} className="flex gap-3">
            <img src={item.icon} className="w-6" />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Host */}
      <div className="flex items-center gap-4 mt-10">
        <img
          src={room.hotel.owner.image}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="font-semibold">
            Hosted by {room.hotel.owner.username}
          </p>
          <StarRating />
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;