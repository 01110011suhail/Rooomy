import React from 'react';
import { motion } from 'framer-motion';
import HotelCard from './HotelCard';
import Title from './Title';
import { useAppContext } from '../context/AppContext';

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.6 },
    },
  };

  // Card animation with permanent 3D tilt
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1.05,        // same as hover scale
      rotateX: 5,          // tilt
      rotateY: 5,
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      transition: { duration: 0.8 },
    },
  };

  // Take first 3 rooms for featured
  const featuredRooms = rooms.slice(0, 3);

  return rooms.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-gradient-to-b from-slate-50 to-white py-24'>

      {/* Title Section */}
      <Title
        title={'Featured Destinations'}
        subTitle={'Explore our most popular destinations and find your perfect stay.'}
      />

      {/* Centered Featured Cards */}
      <motion.div
        className='flex flex-col sm:flex-row justify-center items-center gap-8 mt-16'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {featuredRooms.map((room, index) => (
          <motion.div
            key={room._id}
            variants={cardVariants}
            className='rounded-xl overflow-hidden perspective-1000 w-full sm:w-80'
          >
            <HotelCard room={room} index={index} />
          </motion.div>
        ))}
      </motion.div>

      {/* View All Button */}
      <motion.button
        onClick={() => { navigate('/rooms'); scrollTo(0, 0); }}
        className='mt-16 px-6 py-3 font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg transition-transform duration-300'
        whileTap={{ scale: 0.95 }}
      >
        View All Destinations
      </motion.button>
    </div>
  );
};

export default FeaturedDestination;