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
            totalBookings: data.data.recentSearchCities.length, // or actual booking count from backend
            totalRevenue: data.data.totalRevenue || 0, // replace with real field if exists
            bookings: data.data.bookings || [], // replace with real bookings array from backend
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
    <div>
      <Title
        align='left'
        font='outfit'
        title='Dashboard'
        subTitle='Monitor your room listings, track bookings, and analyze revenue in one place.'
      />

      <div className='flex gap-4 my-8'>
        <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className='text-blue-500 text-lg'>Total Bookings</p>
            <p className='text-neutral-400 text-base'>{dashboardData.totalBookings}</p>
          </div>
        </div>
        <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
          <div className='flex flex-col sm:ml-4 font-medium'>
            <p className='text-blue-500 text-lg'>Total Revenue</p>
            <p className='text-neutral-400 text-base'>$ {dashboardData.totalRevenue}</p>
          </div>
        </div>
      </div>

      <h2 className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
        Recent Bookings
      </h2>
      <table className='w-full'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
            <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Room Name</th>
            <th className='py-3 px-4 text-gray-800 font-medium text-center'>Total Amount</th>
            <th className='py-3 px-4 text-gray-800 font-medium text-center'>Payment Status</th>
          </tr>
        </thead>
        <tbody className='text-sm'>
          {dashboardData.bookings.map((item, index) => (
            <tr key={index}>
              <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                {item.user?.username}
              </td>
              <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                {item.room?.roomType}
              </td>
              <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                $ {item.totalPrice}
              </td>
              <td className='py-3 px-4 border-t border-gray-300 flex justify-center'>
                <button
                  className={`py-1 px-3 text-xs rounded-full ${
                    item.isPaid ? 'bg-green-200 text-green-600' : 'bg-amber-200 text-yellow-600'
                  }`}
                >
                  {item.isPaid ? 'Completed' : 'Pending'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;