import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination.jsx'
import ExclusiveOffer from '../components/ExclusiveOffer.jsx'
import Testimonial from '../components/Testimonial.jsx'
import NewsLetter from '../components/NewsLetter.jsx'
import RecommendedHotel from '../components/RecommendedHotel.jsx'

const Home = () => {
  return (
    <>
        <Hero />
        <RecommendedHotel />
        <FeaturedDestination />
        <ExclusiveOffer />
        <Testimonial />
        <NewsLetter />  
    </>
  )
}

export default Home