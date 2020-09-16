import React from 'react'
import PropTypes from 'prop-types'

const JobCardImage = ({ job, logoUrl }) => {
  return (
    <img
      data-cy={`job-card-image-${job.id}`}
      src={logoUrl}
      alt={`${job.companyName} Logo`}
      className='my-auto w-full'
    />
  )
}

JobCardImage.propTypes = {
  logoUrl: PropTypes.string,
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
  }).isRequired,
}

JobCardImage.defaultProps = {
  logoUrl: '',
}

export default JobCardImage
