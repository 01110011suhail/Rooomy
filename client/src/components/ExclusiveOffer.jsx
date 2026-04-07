import React, { useState } from "react"
import Title from "./Title"
import { assets, exclusiveOffers } from "../assets/assets"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

const ExclusiveOffer = () => {
  const [favorites, setFavorites] = useState({})

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // 🔥 Animation Variants (more premium feel)
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 60 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const Card = ({ item }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      className="group relative h-[340px] rounded-3xl overflow-hidden shadow-xl"
    >
      {/* 🌄 Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${item.image})` }}
      />

      {/* 🌈 Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* 🧊 Glass Effect */}
      <div className="absolute inset-0 backdrop-blur-[6px] opacity-30 group-hover:opacity-50 transition" />

      {/* 💸 Discount Badge */}
      <div className="absolute top-5 left-5 bg-white/90 text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
        {item.priceOff}% OFF
      </div>

      {/* ❤️ Favorite */}
      <button
        onClick={() => toggleFavorite(item._id)}
        className="absolute top-5 right-5 text-xl transition transform hover:scale-125"
      >
        {favorites[item._id] ? "❤️" : "🤍"}
      </button>

      {/* 📦 Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
        <h3 className="text-2xl font-bold tracking-wide">
          {item.title}
        </h3>

        <p className="text-sm text-white/80 mt-1 line-clamp-2">
          {item.description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-white/60">
            Expires {item.expiryDate}
          </span>

          <motion.button
            whileHover={{ x: 6 }}
            className="flex items-center gap-2 text-sm font-semibold"
          >
            Explore
            <img src={assets.arrowIcon} className="w-4 invert" />
          </motion.button>
        </div>
      </div>

      {/* ✨ Glow Border */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/30 transition" />
    </motion.div>
  )

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      
      {/* 🏷 Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <Title
          align="left"
          title="Curated Escapes"
          subTitle="Handpicked luxury experiences tailored for unforgettable journeys."
        />

        <motion.button
          whileHover={{ x: 6 }}
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black transition"
        >
          Browse All
          <img src={assets.arrowIcon} className="w-4" />
        </motion.button>
      </div>

      {/* 📱 Mobile Slider */}
      <div className="mt-14 md:hidden">
        <Swiper spaceBetween={18} slidesPerView={1.15}>
          {exclusiveOffers.map((item) => (
            <SwiperSlide key={item._id}>
              <Card item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🖥 Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {exclusiveOffers.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </section>
  )
}

export default ExclusiveOffer


