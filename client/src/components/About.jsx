import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  const features = [
    {
      title: 'Easy Booking',
      description: 'Book hotels in just a few clicks with our intuitive interface.',
      icon: assets.bookingIcon,
    },
    {
      title: 'Verified Listings',
      description: 'We ensure all hotels listed are verified for quality and service.',
      icon: assets.verifiedIcon,
    },
    {
      title: 'Exclusive Deals',
      description: 'Get the best prices and exclusive offers on hotels worldwide.',
      icon: assets.dealsIcon,
    },
  ];

  return (
    <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-16 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          About <span className="text-primary">Roomy</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Roomy is your go-to hotel booking platform designed to make your travel experience seamless, 
          comfortable, and memorable. Whether you're looking for a cozy room or a luxury suite, 
          Roomy has you covered.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <img src={feature.icon} alt={feature.title} className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Ready to find your perfect stay?
        </h3>
        <a
          href="/rooms"
          className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-full shadow-md hover:bg-primary-dark transition-all duration-300"
        >
          Explore Hotels
        </a>
      </div>
    </section>
  );
};

export default About;