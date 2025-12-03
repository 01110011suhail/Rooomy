import React, { useState, useEffect } from 'react';
import { roomsDummyData } from '../assets/assets';
import StarRating from '../components/StarRating';
import { assets } from '../assets/assets';
import { useParams } from 'react-router-dom';

const RoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        const roomData = roomsDummyData.find(room => room._id === id);
        if (roomData) {
            setRoom(roomData);
            setMainImage(roomData.images[0]);
        }
    }, [id]);

    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>

            {/* Room Header */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl font-playfair'>
                    {room.hotel.name} 
                    <span className='font-inter text-sm'> ({room.roomType})</span>
                </h1>
                <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>
                    20% OFF
                </p>
            </div>

            {/* Room Rating */}
            <div className='flex items-center gap-1 mt-2'>
                <StarRating />
                <p className='ml-2'>(200+ reviews)</p>
            </div>

            {/* Room Address */}
            <div className='flex items-center gap-1 text-gray-500 mt-2'>
                <img src={assets.locationIcon} alt="location" />
                <span>{room.hotel.address}</span>
            </div>

            {/* Room Images */}
            <div className='flex flex-col lg:flex-row mt-6 gap-6'>

                {/* Left column — Main Image */}
                <div className='lg:w-1/2 w-full'>
                    <img 
                        src={mainImage} 
                        alt="main-room-img" 
                        className='w-full h-96 md:h-110 lg:h-80 xl:h-96 object-cover rounded-xl shadow-lg' 
                    />
                </div>

                {/* Right column — Thumbnail Images */}
                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                    {room?.images && room.images.length > 1 && room.images.map((image, index) => (
                        <img 
                            onClick={() => setMainImage(image)} 
                            key={index} 
                            src={image} 
                            alt="room-thumbnail" 
                            className={`w-full h-40 object-cover rounded-xl shadow-md cursor-pointer 
                                ${mainImage === image ? 'outline outline-3 outline-orange-500' : ''}`}
                        />
                    ))}
                </div>

            </div>

        </div>
    );
};

export default RoomDetails;
