import React from 'react'
import PropTypes from 'prop-types'

const JobCardImage = ({ logoUrl, job }) => {
  if (logoUrl) {
    return (
      <img
        data-cy={`job-card-image-${job.id}`}
        src={logoUrl}
        alt={`${job.companyName} Logo`}
        className='my-auto w-full'
      />
    )
  } else {
    return null
  }
}

JobCardImage.propTypes = {
  logoUrl: PropTypes.func.isRequired,
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    companyName: PropTypes.string.isRequired,
  }).isRequired,
}

export default JobCardImage
