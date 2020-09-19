import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

const TierSelectCard = ({ children, value, receivingTierClick, tier }) => {
  const route = useLocation()

  return (
    <div
      className={`p-6 md:p-8 shadow rounded text-left md:text-center cursor-pointer border-t-8 border-gray-300  transform ease-in-out duration-150 bg-white mx-auto mb-4 grid grid-cols-3 md:grid-cols-1 w-full
      ${
        route.pathname === '/post-a-job'
          ? 'hover:border-teal-300 hover:scale-107 hover:shadow-md'
          : ''
      }
      ${tier === value ? 'border-teal-300 bg-gray-100 scale-105' : ''}`}
      onClick={() => {
        receivingTierClick(value)
      }}
      onKeyDown={() => {
        receivingTierClick(value)
      }}
      role='button'
      tabIndex='0'
    >
      {route.pathname === '/' ? (
        <div className='hidden absolute bg-error px-4 py-2 z-10 text-white uppercase -rotate-15 transform text-sm font-semibold tracking-widest -ml-1 shadow'>
          Free for now!
        </div>
      ) : (
        ''
      )}
      {children}
    </div>
  )
}

TierSelectCard.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  receivingTierClick: PropTypes.func.isRequired,
  tier: PropTypes.string,
}

TierSelectCard.defaultProps = {
  tier: '',
}

export default TierSelectCard
