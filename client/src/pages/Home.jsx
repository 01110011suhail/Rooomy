import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/navbar.jsx'
import FeaturedDestination from '../components/FeaturedDestination.jsx'
import ExclusiveOffer from '../components/ExclusiveOffer.jsx'
import Testimonial from '../components/Testimonial.jsx'
import NewsLetter from '../components/NewsLetter.jsx'

const Home = () => {
  return (
    <>
        <Hero />
        <FeaturedDestination />
        <ExclusiveOffer />
        <Testimonial />
        <NewsLetter />  
    </>
  )
}

export default Home