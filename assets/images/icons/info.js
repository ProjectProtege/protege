import React from 'react'
import PropTypes from 'prop-types'

const Info = ({ className }) => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 24 24'
    className={`${className} inline-block`}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
)

export default Info

Info.propTypes = {
  className: PropTypes.string,
}

Info.defaultProps = {
  className: '',
}
