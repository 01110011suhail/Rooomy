import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import Title from '../../components/Title';

const ListRoom = () => {
  const { axios, getToken } = useAppContext();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch rooms
  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await getToken();
      const { data } = await axios.get('/api/rooms/owner', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) setRooms(data.rooms || []);
      else setError('Failed to load rooms.');
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError('Something went wrong while fetching rooms.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Toggle availability (Optimistic UI)
  const toggleAvailability = async (roomId) => {
    const previousRooms = [...rooms];

    setRooms((prev) =>
      prev.map((room) =>
        room._id === roomId
          ? { ...room, isAvailable: !room.isAvailable }
          : room
      )
    );

    try {
      const token = await getToken();
      const { data } = await axios.post(
        '/api/rooms/toggle-availability',
        { roomId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.success) throw new Error('Update failed');
    } catch (error) {
      console.error('Error toggling availability:', error);
      setRooms(previousRooms);
    }
  };



  // Loading UI
  if (loading) {
    return <p className="text-gray-500 mt-8 animate-pulse">Loading rooms...</p>;
  }

  // Error UI
  if (error) {
    return <p className="text-red-500 mt-8">{error}</p>;
  }

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="Manage your rooms. Edit details, toggle availability, or delete rooms safely."
      />

      <p className="text-gray-500 mt-6">All Rooms</p>

      {rooms.length === 0 ? (
        <p className="text-gray-500 mt-4">No rooms found.</p>
      ) : (
        <div className="w-full max-w-4xl text-left border border-gray-200 rounded-xl overflow-hidden mt-4 shadow-md">
          <table className="w-full border-collapse">
            <thead className="bg-blue-50 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left max-sm:hidden">Facility</th>
                <th className="py-3 px-6 text-left">Price / night</th>
                <th className="py-3 px-6 text-center">Availability</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-sm">
              {rooms.map((room) => (
                <tr
                  key={room._id}
                  className="hover:bg-gray-50 transition-colors duration-200 border-b"
                >
                  <td className="py-3 px-6 font-medium">{room.roomType || 'N/A'}</td>
                  <td className="py-3 px-6 max-sm:hidden">
                    {room.amenities?.length ? room.amenities.join(', ') : 'N/A'}
                  </td>
                  <td className="py-3 px-6">₹{room.pricePerNight?.toLocaleString() || 0}</td>

                  {/* Toggle Availability */}
                  {/* Toggle Availability */}
                  <td className="py-3 px-6 text-center">
                    <label className="relative inline-flex items-center cursor-pointer gap-2">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={room.isAvailable}
                        onChange={() => toggleAvailability(room._id)}
                        aria-label="Toggle room availability"
                      />
                      <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
                      <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-7 shadow-md"></span>
                    </label>
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListRoom;