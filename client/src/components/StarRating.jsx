import React from 'react'

const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex">
      {[...Array(rating)].map((_, index) => (
        <svg
          key={index} // ✅ Added key here
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-4 h-4 text-yellow-400"
          viewBox="0 0 16 16"
        >
          <path d="M8 12.146l3.717 2.223-1-4.268L14 6.789l-4.332-.377L8 2 6.332 6.412 2 6.789l3.283 3.312-1 4.268L8 12.146z" />
        </svg>
      ))}
    </div>
  )
}

export default StarRating