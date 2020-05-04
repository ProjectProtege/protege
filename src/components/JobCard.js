import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { storage } from '../firebase/firebase'
import { motion } from 'framer-motion'

const JobCard = ({ job }) => {
  const [logoUrl, setLogoUrl] = useState()

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

  const postDate = job.postedAt.toDate()

  const formattedPostDate = `${
    months[postDate.getMonth() + 1]
  } ${postDate.getDate()}`

  useEffect(() => {
    storage
      .ref('images')
      .child(job.companyLogo)
      .getDownloadURL()
      .then((url) => {
        setLogoUrl(url)
      })
  }, [job.companyLogo])

  return (
    <Link
      data-cy={`job-card-link-${job.id}`}
      to={`/job-board/${job.id}`}
      className='flex mb-6 md:mb-12 px-3 md:px-6 py-4 bg-white shadow border-l-4 border-teal-500 transform hover:scale-105 hover:shadow-lg transition duration-150 ease-in-out'
    >
      <div
        className='hidden md:flex flex-col shadow-md rounded-full p-2 md:w-1/6 overflow-hidden relative'
        style={{ width: 75, height: 75 }}
      >
        <motion.div
          style={{ width: 75, height: 75 }}
          className='absolute bg-white'
          animate={{
            opacity: [1, 0],
          }}
          transition={{
            delay: 0.1,
          }}
        />
        <img
          data-cy={`job-card-image-${job.id}`}
          src={logoUrl}
          alt={`${job.companyName} Logo`}
          className='my-auto w-full'
        />
      </div>

      <div className='w-full md:w-11/12 flex justify-between md:pl-6'>
        <div className='flex flex-col w-10/12 lg:w-8/12 justify-between'>
          <p
            data-cy={`job-card-company-name-${job.id}`}
            className='text-sm text-blue-300'
          >
            {job.companyName}
          </p>

          <h3
            data-cy={`job-card-job-title-${job.id}`}
            className='md:-mt-1 text-blue-500 leading-tight text-lg md:text-xl font-bold'
          >
            {job.jobTitle}
          </h3>

          <p
            data-cy={`job-card-role-focus-${job.id}`}
            className='text-teal-700'
          >
            {job.roleFocus}
          </p>
        </div>

        <div className='text-right flex flex-col justify-between'>
          <p
            data-cy={`job-card-formatted-date-${job.id}`}
            className='text-teal-600 font-semibold'
          >
            {formattedPostDate}
          </p>

          <p
            data-cy={`job-card-company-hq-${job.id}`}
            className='text-blue-100 text-sm'
          >
            {job.companyHQ}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default JobCard
