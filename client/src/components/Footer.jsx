import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-[#F6F9FC] to-white text-gray-600">

      {/* 🔁 MARQUEE */}
      <div className="overflow-hidden border-y border-gray-200 py-3 bg-white">
        <div className="whitespace-nowrap animate-marquee text-lg md:text-xl font-semibold text-gray-800 tracking-wide">
          ✦ Luxury Stays ✦ Exclusive Offers ✦ Premium Comfort ✦ Unforgettable Experiences ✦
        </div>
      </div>

      {/* MAIN */}
      <div className='pt-16 px-6 md:px-16 lg:px-24 xl:px-32'>

        {/* TOP GRID */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>

          {/* BRAND */}
          <div>
            <img src={assets.logo} alt="logo" className='mb-5 h-9 opacity-80' />
            <p className='text-sm leading-relaxed'>
              Discover refined stays, curated experiences, and timeless luxury — crafted for travelers who expect more.
            </p>

            <div className='flex gap-4 mt-5'>
              {[assets.facebookIcon, assets.twitterIcon, assets.instagramIcon, assets.linkendinIcon].map((icon, i) => (
                <img key={i} src={icon} className='w-5 cursor-pointer hover:scale-110 hover:opacity-80 transition duration-300' />
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <p className='font-playfair text-lg text-gray-900 mb-4'>Company</p>
            <ul className='space-y-2 text-sm'>
              {["About", "Careers", "Press", "Blog", "Partners"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-black transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <p className='font-playfair text-lg text-gray-900 mb-4'>Support</p>
            <ul className='space-y-2 text-sm'>
              {["Help Center", "Safety Info", "Cancellation", "Contact"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-black transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className='bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-200'>
            <p className='font-playfair text-lg text-gray-900'>Stay Updated</p>
            <p className='mt-2 text-sm'>
              Get exclusive deals and luxury travel inspiration.
            </p>

            <div className='mt-5 flex items-center border border-gray-300 rounded-full overflow-hidden'>
              <input 
                type="email"
                placeholder='Enter your email'
                className='px-4 py-2 w-full text-sm outline-none bg-transparent'
              />
              <button className='bg-black text-white px-5 py-2 text-sm hover:bg-gray-800 transition'>
                Join
              </button>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className='mt-14 border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm'>

          <p className='text-gray-500'>
            © {new Date().getFullYear()} Roomy. Crafted for luxury living.
          </p>

          <div className='flex gap-6'>
            {["Privacy", "Terms", "Sitemap"].map((item, i) => (
              <a key={i} href="#" className="hover:text-black transition">{item}</a>
            ))}
          </div>

        </div>

      </div>

      {/* 🔧 ANIMATION */}
      <style>
        {`
          .animate-marquee {
            display: inline-block;
            padding-left: 100%;
            animation: marquee 15s linear infinite;
          }

          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
        `}
      </style>

    </div>
  )
}

export default Footer