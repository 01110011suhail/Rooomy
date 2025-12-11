import React, { useState } from 'react'

const AddRoom = () => {
    const [images, setImages]= useState({
        1: null,
        2: null,
        3: null,
        4: null

    })
    const [inputs, setInputs] = useState({
        roomType: '',
        pricePerNight: 0,
        amenities:{
            'Free Wifi' : false,
            'Free BReakFast' : false,
            'Room Service' : false,
            'Mountain View' : false,
            'Pool Access' : false

        }
    })
  return (
    <div>
        
    </div>
  )
}

export default AddRoom