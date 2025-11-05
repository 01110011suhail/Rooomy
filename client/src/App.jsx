import React from 'react'
import Navbar from './components/navbar'
import { useLocation } from 'react-router-dom'

const App = () => {

  const isOwnerpath =useLocation().pathname.includes('/owner');
  return (
    <div>
     {!isOwnerpath && <Navbar />}
    </div>
  )
}

export default App