import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();

    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchCities, setSearchCities] = useState([]);

    const fetchUser = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get("/api/user", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (data.success) {
                setIsOwner(data.role === "hotelOwner");
                setSearchCities(data.recentSearchCities || []);
            } else {
                setTimeout(fetchUser, 5000);
            }
        } catch (error) {
            toast.error(error.message || "Failed to fetch user");
        }
    };

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user, getToken]);

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
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
