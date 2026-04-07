import React, { useState } from 'react';
import { assets, cities } from '../assets/assets';
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';

const HotelReg = () => {
  // ✅ FIX: everything inside component
  const { setShowHotelReg, axios, getToken, setIsOwner, navigate } = useAppContext();

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const token = await getToken();

      const { data } = await axios.post(
        '/api/hotels/register',
        { name, contact, address, city },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message || 'Hotel registered successfully!');

        setIsOwner(true);
        setShowHotelReg(false);

        // ✅ redirect works now
        navigate('/owner');

      } else {
        toast.error(data.message || 'Failed to register hotel');
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong';

      toast.error(errMsg);
      console.error('Hotel registration error:', error);
    }
  };

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-xl max-w-4xl max-md:mx-2 w-full"
      >
        <img
          src={assets.regImage}
          alt="reg-image"
          className="w-1/2 rounded-l-xl hidden md:block object-cover"
        />

        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10 w-full">
          <img
            src={assets.closeIcon}
            alt="close-icon"
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
            onClick={() => setShowHotelReg(false)}
          />

          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>

          <div className="w-full mt-4">
            <label className="font-medium text-gray-500">Hotel Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 mt-1.5"
              required
            />
          </div>

          <div className="w-full mt-4">
            <label className="font-medium text-gray-500">Phone</label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full border px-3 py-2 mt-1.5"
              required
            />
          </div>

          <div className="w-full mt-4">
            <label className="font-medium text-gray-500">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border px-3 py-2 mt-1.5"
              required
            />
          </div>

          <div className="w-full mt-4 max-w-xs mr-auto">
            <label className="font-medium text-gray-500">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border w-full px-3 py-2.5 mt-1"
              required
            >
              <option value="" disabled>Select City</option>
              {cities.map((c, index) => (
                <option key={index} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-indigo-500 text-white px-6 py-2 mt-6 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;