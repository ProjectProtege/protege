import React from 'react'

const TierSelectCard = ({ children, value, receivingClick, tier }) => {
  return (
    <div
      className={`p-6 md:p-8 shadow rounded text-left md:text-center cursor-pointer border-t-8 border-white hover:border-teal-300 transform ease-in-out duration-150 hover:scale-107 hover:shadow-md bg-white mx-auto mb-4 grid grid-cols-3 md:grid-cols-1 w-full ${
        tier === value ? 'border-teal-300 bg-gray-100 scale-105' : ''
      }`}
      onClick={(e) => {
        e.preventDefault()
        receivingClick(value)
      }}
    >
      {children}
    </div>
  )
}

export default TierSelectCard
