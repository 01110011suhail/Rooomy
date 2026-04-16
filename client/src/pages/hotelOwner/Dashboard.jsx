import React, { useState, useEffect } from 'react';
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    bookings: [],
  });

  const { axios, getToken } = useAppContext();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setDashboardData({
            totalBookings: data.data.recentSearchCities.length,
            totalRevenue: data.data.totalRevenue || 0,
            bookings: data.data.bookings || [],
          });
        } else {
          toast.error('Failed to fetch dashboard data');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error fetching dashboard data');
      }
    };

    fetchDashboardData();
  }, [axios, getToken]);

  return (
    <div className="p-4">
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings, and analyze revenue in one place."
      />

      {/* Metrics Cards */}
      <div className="flex flex-wrap gap-6 my-8">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg flex items-center p-6 w-full sm:w-1/2 md:w-1/3">
          <div className="bg-blue-100 p-3 rounded-full">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 3h2v14H3V3zm4 0h2v14H7V3zm4 0h2v14h-2V3zm4 0h2v14h-2V3z" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <p className="text-gray-900 font-semibold text-lg">{dashboardData.totalBookings}</p>
          </div>
        </div>

        <div className="bg-white shadow-md border border-gray-200 rounded-lg flex items-center p-6 w-full sm:w-1/2 md:w-1/3">
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-gray-900 font-semibold text-lg">$ {dashboardData.totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-medium">User Name</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium max-sm:hidden">Room Name</th>
              <th className="py-3 px-4 text-center text-gray-700 font-medium">Total Amount</th>
              <th className="py-3 px-4 text-center text-gray-700 font-medium">Payment Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.bookings.map((item, index) => (
              <tr
                key={index}
                className={`border-t border-gray-200 hover:bg-gray-50 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <td className="py-3 px-4 text-gray-700">{item.user?.username}</td>
                <td className="py-3 px-4 text-gray-700 max-sm:hidden">{item.room?.roomType}</td>
                <td className="py-3 px-4 text-center text-gray-700">$ {item.totalPrice}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`inline-block py-1 px-3 text-xs rounded-full ${
                      item.isPaid ? 'bg-green-200 text-green-600' : 'bg-yellow-200 text-yellow-600'
                    }`}
                  >
                    {item.isPaid ? 'Completed' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;