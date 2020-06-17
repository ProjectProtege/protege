import React from 'react'
import { useLocation } from 'react-router-dom'

const TierSelectCard = ({ children, value, receivingClick, tier }) => {
  const route = useLocation()

  return (
    <div
      className={`p-6 md:p-8 shadow rounded text-left md:text-center border-t-8 border-gray-300  transform ease-in-out duration-150 bg-white mx-auto mb-4 grid grid-cols-3 md:grid-cols-1 w-full
      ${
        route.pathname === '/post-a-job'
          ? 'hover:border-teal-300 hover:scale-107 hover:shadow-md cursor-pointer'
          : ''
      }
      ${tier === value ? 'border-teal-300 bg-gray-100 scale-105' : ''}`}
      onClick={(e) => {
        receivingClick(value)
      }}
    >
      {children}
    </div>
  )
}

export default TierSelectCard
