import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const JobCard = ({ job }) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]

  const postDate = new Date(job.postedAt)

  const formattedPostDate = `${
    months[postDate.getMonth()]
  } ${postDate.getDate()}`

  return (
    <Link data-cy={`job-card-link-${job.id}`} href={`/job-board/${job.id}`}>
      <a className='flex items-center px-3 py-4 mb-6 transition duration-150 ease-in-out transform bg-white rounded-md shadow md:mb-12 md:px-6 hover:shadow-md overflow-hidden'>
        <div className='absolute bg-gradient-to-t from-teal-500 to-teal-300 left-0 h-full w-1'></div>
        <div
          className='items-center justify-center hidden overflow-hidden bg-white rounded-full shadow-md md:flex'
          style={{ width: 75, height: 75 }}
        >
          <img
            data-cy={`job-card-image-${job.id}`}
            src={job.companyLogo}
            alt={`${job.companyName} Logo`}
            className='w-full my-auto'
          />
        </div>

        <div className='flex justify-between w-full md:w-11/12 md:pl-6'>
          <div className='flex flex-col justify-between'>
            <div>
              <p
                data-cy={`job-card-company-name-${job.id}`}
                className='mb-1 text-sm text-blue-400'
              >
                {job.companyName}
              </p>

              <h2
                data-cy={`job-card-job-title-${job.id}`}
                className='text-xl leading-tight text-blue-900 capitalize md:-mt-1 xl:text-2xl'
              >
                {job.jobTitle}
              </h2>
            </div>

            <p
              data-cy={`job-card-role-focus-${job.id}`}
              className='text-teal-700'
            >
              {job.roleFocus}
            </p>
          </div>

          <div className='flex items-center text-right'>
            <p
              data-cy={`job-card-formatted-date-${job.id}`}
              className='text-lg font-bold text-teal-700'
            >
              {formattedPostDate}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    companyLogo: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    roleFocus: PropTypes.string.isRequired,
    postedAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
}

export default JobCard
