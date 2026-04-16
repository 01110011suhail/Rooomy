import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
      'Air Conditioning': false,
      'Parking': false,
      'Gym Access': false,
      'TV': false,
      'Mini Bar': false,
    },
  });

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({ ...prev, [key]: file }));
    }
  };

  const increasePrice = () => {
    setInputs((prev) => ({
      ...prev,
      pricePerNight: Number(prev.pricePerNight) + 1,
    }));
  };

  const decreasePrice = () => {
    setInputs((prev) => ({
      ...prev,
      pricePerNight: Math.max(0, Number(prev.pricePerNight) - 1),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.values(images).forEach((img) => img && formData.append('images', img));
    formData.append('roomType', inputs.roomType);
    formData.append('pricePerNight', inputs.pricePerNight);
    formData.append(
      'amenities',
      JSON.stringify(
        Object.keys(inputs.amenities).filter((key) => inputs.amenities[key])
      )
    );

    try {
      const token = await getToken();
      const { data } = await axios.post('/api/rooms', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success(data.message || 'Room added successfully');

        setInputs({
          roomType: '',
          pricePerNight: 0,
          amenities: Object.fromEntries(
            Object.keys(inputs.amenities).map((key) => [key, false])
          ),
        });

        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message || 'Failed to add room');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-white rounded-xl shadow-md max-w-4xl w-full mx-auto"
    >
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Fill in details carefully"
      />

      {/* Images */}
      <p className="text-gray-700 mt-5 font-medium">Images</p>
      <div className="flex gap-3 flex-wrap mt-2">
        {Object.keys(images).map((key) => (
          <label
            key={key}
            className="relative group cursor-pointer hover:scale-105 transition"
          >
            <img
              src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
              className="h-16 w-16 object-cover rounded-lg border"
            />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleImageChange(e, key)}
            />
          </label>
        ))}
      </div>

      {/* Room Type + Price */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {/* Room Type */}
        <div>
          <p className="text-gray-700 font-medium">Room Type</p>
          <select
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="mt-1 p-2 border rounded-lg w-full"
            required
          >
            <option value="">Select</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Bed">Luxury Bed</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <p className="text-gray-700 font-medium">
            Price <span className="text-xs text-gray-500">/ night</span>
          </p>

          <div className="flex items-center gap-2 mt-1">
            <button
              type="button"
              onClick={decreasePrice}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>

            <input
              type="number"
              min="0"
              value={inputs.pricePerNight}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  pricePerNight: Math.max(0, e.target.value),
                })
              }
              className="w-20 text-center border rounded p-1"
            />

            <button
              type="button"
              onClick={increasePrice}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <p className="text-gray-700 mt-4 font-medium">Amenities</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <label
            key={index}
            className="flex items-center gap-2 bg-gray-50 p-2 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
            />
            <span className="text-sm">{amenity}</span>
          </label>
        ))}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:scale-105 transition"
      >
        Add Room
      </button>
    </form>
  );
};

export default AddRoom;