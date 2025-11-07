// import React from 'react';
// import heroImage from '../assets/heroImage.png';

// const Hero = () => {
//   return (
//     <div
//       className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen relative"
//       style={{ backgroundImage: `url(${heroImage})` }}
//     >
//       <h1 className="text-5xl font-bold">Welcome</h1>
//     </div>
//   );
// };

// export default Hero;

import React from 'react';
import heroImage from '../assets/heroImage.png';

const Hero = () => {
  return (
    <div
      className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen relative"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/40" /> {/* overlay for contrast */}
      <div className="relative z-10">
        <h1 className="text-5xl font-bold">Welcome</h1>
        <p className="mt-4 text-lg text-gray-200 max-w-lg">
          Explore our new collection and exclusive designs.
        </p>
        <button className="mt-6 bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
