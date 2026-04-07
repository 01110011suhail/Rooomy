// AppContext.jsx
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
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

  const currency = import.meta.env.VITE_CURRENCY || "$";

  // ✅ Fetch rooms
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms");
      if (data.success) {
        setRooms(data.rooms);
      } else {
        setTimeout(fetchRooms, 3000);
      }
    } catch (error) {
      console.error("Fetch rooms error:", error.message);
      setTimeout(fetchRooms, 5000);
    }
  };

  // ✅ Fetch user data (NO owner logic here ❗)
  const fetchUser = async () => {
    if (!user) return;

    try {
      const token = await getToken();

      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setSearchCities(data.recentSearchCities || []);
      } else {
        setTimeout(fetchUser, 3000);
      }
    } catch (error) {
      console.error("Fetch user error:", error.message);
      setTimeout(fetchUser, 5000);
    }
  };

  // ✅ ONLY SOURCE OF TRUTH FOR OWNER
  const fetchOwnerStatus = async () => {
    if (!user) return;

    try {
      const token = await getToken();

      const { data } = await axios.get("/api/hotels/my-hotel", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ FINAL FIX
      setIsOwner(!!data.hotel);
    } catch (error) {
      console.error("Owner check error:", error.message);
    }
  };

  // ✅ Run when user logs in
  useEffect(() => {
    if (user) {
      fetchUser();
      fetchOwnerStatus(); // 🔥 MOST IMPORTANT
    }
  }, [user]);

  // ✅ Fetch rooms once
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