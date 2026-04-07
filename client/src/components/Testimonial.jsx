import React from 'react'
import Title from './Title'
import { testimonials } from '../assets/assets'
import StarRating from './StarRating'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'

const Testimonial = () => {
  return (
    <section className="relative flex flex-col items-center px-6 md:px-16 lg:px-24 py-24 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
      <Title
        title="What Our Customers Say"
        subTitle="Hear from our satisfied customers who have experienced unforgettable stays with us."
      />

      <div className="w-full mt-20">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}className='py-8 px-4'> 
              <div className="relative bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl p-8 shadow-2xl hover:scale-105 transition-transform duration-500 h-full flex flex-col justify-between">
                
                <div className="flex items-center gap-4">
                  <img
                    className="w-16 h-16 rounded-full border-2 border-indigo-400 shadow-md"
                    src={t.image}
                    alt={t.name}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t.name}</h3>
                    <p className="text-sm text-gray-500">{t.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-4">
                  <StarRating rating={t.rating} />
                </div>

                <p className="mt-6 text-gray-700 text-sm md:text-base leading-relaxed italic">
                  "{t.review}"
                </p>

                {/* Optional floating gradient circle for design flair */}
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 opacity-30 animate-pulse"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonial