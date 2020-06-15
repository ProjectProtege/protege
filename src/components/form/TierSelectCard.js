import React from 'react'

const TierSelectCard = ({ children }) => (
  <div className='p-6 md:p-8 shadow-md rounded text-left md:text-center cursor-pointer border-t-8 border-white hover:border-teal-300 transform ease-in-out duration-150 hover:scale-105 hover:shadow-lg bg-white mx-auto mb-4 grid grid-cols-3 md:grid-cols-1 w-full'>
    {children}
  </div>
)

export default TierSelectCard
