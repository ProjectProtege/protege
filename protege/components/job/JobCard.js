import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
// import { storage } from '../../firebase/firebase'
import JobCardImage from './JobCardImage'

const JobCard = ({ job, i }) => {
  const [logoUrl, setLogoUrl] = useState()
  const [loading, setLoading] = useState(true)

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

  const variants = {
    show: () => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        ease: 'easeInOut',
        duration: 0.2,
      },
    }),
    hidden: { opacity: 0, y: 10 },
  }

  const postDate = new Date(job.postedAt.nanoseconds)

  const formattedPostDate = `${
    months[postDate.getMonth()]
  } ${postDate.getDate()}`

  // useEffect(() => {
  //   storage
  //     .ref('images')
  //     .child(job.companyLogo)
  //     .getDownloadURL()
  //     .then((url) => {
  //       setLogoUrl(url)
  //       setLoading(false)
  //     })
  // }, [job.companyLogo])

  return (
    <Link data-cy={`job-card-link-${job.id}`} href={`/job-board/${job.id}`}>
      <a>
        <div
          variants={variants}
          custom={i}
          animate='show'
          className='flex px-3 py-4 mb-6 transition duration-150 ease-in-out transform bg-white border-l-4 border-teal-500 shadow md:mb-12 md:px-6 hover:shadow-md'
        >
          <div
            className='relative flex-col hidden p-2 overflow-hidden rounded-full shadow-md md:flex md:w-1/6'
            style={{ width: 75, height: 75 }}
          >
            <div
              style={{ width: 75, height: 75 }}
              className={`absolute bg-white transition ease-out duration-300 ${
                loading ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <JobCardImage logoUrl={logoUrl} job={job} />
          </div>

          <div className='flex justify-between w-full md:w-11/12 md:pl-6'>
            <div className='flex flex-col justify-between w-10/12 lg:w-8/12'>
              <div>
                <p
                  data-cy={`job-card-company-name-${job.id}`}
                  className='mb-1 text-sm text-blue-700'
                >
                  {job.companyName}
                </p>

                <h2
                  data-cy={`job-card-job-title-${job.id}`}
                  className='text-lg font-semibold leading-tight text-blue-900 md:-mt-1 md:text-xl'
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
                className='font-semibold text-teal-700 md:text-lg'
              >
                {formattedPostDate}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

JobCard.propTypes = {
  i: PropTypes.number.isRequired,
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    companyLogo: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    roleFocus: PropTypes.string.isRequired,
    postedAt: PropTypes.shape({
      nanoseconds: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired,
      toDate: PropTypes.func.isRequired,
    }),
  }).isRequired,
}

export default JobCard
