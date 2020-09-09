import React from 'react'

const JobCardImage = ({logoUrl, job}) => {
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
    return ''
  }
}

export default JobCardImage
