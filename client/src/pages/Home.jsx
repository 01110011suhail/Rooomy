import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/navbar.jsx'
import FeaturedDestination from '../components/FeaturedDestination.jsx'
import ExclusiveOffer from '../components/ExclusiveOffer.jsx'

const Home = () => {
  return (
    <>
        <Hero />
        <FeaturedDestination />
        <ExclusiveOffer />
    </>
  )
}

export default Home