// AppContext.jsx
import axios from "axios";
import { createContext, use, useContext, useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchCities, setSearchCities] = useState([]);
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms");
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error("Failed to fetch rooms. Retrying...");
        setTimeout(fetchRooms, 3000);
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Failed to fetch rooms";
      console.error("Fetch rooms error:", errMsg);
      setTimeout(fetchRooms, 5000);
    }
  }

  const currency = import.meta.env.VITE_CURRENCY || "$";

  // ✅ Fetch user role & recent searches
  const fetchUser = async () => {
    if (!user) return;

    try {
      const token = await getToken(); // Clerk token
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setIsOwner(data.role === "hotelOwner");
        setSearchCities(data.recentSearchCities || []);
      } else {
        toast.error("Failed to fetch user data. Retrying...");
        setTimeout(fetchUser, 3000); // Retry in 3 sec
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Failed to fetch user";
      console.error("Fetch user error:", errMsg);
      // Retry silently without spamming toast
      setTimeout(fetchUser, 5000);
    }
  };

  // 🔥 Run fetchUser only when Clerk user is available
  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const value = {
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios,
    showHotelReg,
    setShowHotelReg,
    currency,
    searchCities,
    setSearchCities,
    rooms,
    setRooms,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);