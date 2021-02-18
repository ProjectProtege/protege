import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const JobCardImage = ({ job, logoUrl }) => {
  return (
    <Image
      data-cy={`job-card-image-${job.id}`}
      src={logoUrl}
      alt={`${job.companyName} Logo`}
      layout='responsive'
      width={60}
      height={60}
      quality={25}
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
