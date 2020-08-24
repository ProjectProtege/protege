import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

const AdminJobCard = ({ job, i, onclick, deleteJobForever }) => {
  const [status, setStatus] = useState('')

  const variants = {
    show: (i) => ({
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

  useEffect(() => {
    setStatus(job.status)
  }, [job.status])

  const months = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'June',
    'July',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ]

  const postDate = job.postedAt.toDate()

  const formattedPostDate = `${
    months[postDate.getMonth()]
  } ${postDate.getDate()}, ${postDate.getFullYear()}`

  function handleClick(e) {
    onclick(job.id)
  }

  return (
    <AnimatePresence>
      <motion.li
        className='bg-white px-5 py-3 shadow mb-6 border-l-2 border-teal-500 justify-between grid grid-cols-12 gap-4 cursor-pointer'
        onClick={handleClick}
        variants={variants}
        animate='show'
        custom={i}
        whileTap={{ scale: 0.99 }}
      >
        <p
          className='text-blue-900 font-bold col-span-5 truncate'
          data-cy={`job-card-job-title-${job.id}`}
        >
          {job.jobTitle}
        </p>

        <p
          className='text-blue-400 font-light col-span-3 truncate'
          data-cy={`job-card-company-name-${job.id}`}
        >
          {job.companyName}
        </p>

        <div className='col-span-2 flex'>
          <p
            className={`font-light rounded-full px-4 shadow-inner ${
              status === 'active'
                ? 'text-teal-900 bg-teal-100'
                : status === 'inactive'
                ? 'text-error-full bg-error-50'
                : 'text-gray-500'
            } capitalize truncate`}
          >
            {status}
          </p>
        </div>

        <div className='col-span-2 flex justify-end'>
          <p
            className='text-blue-400 font-light truncate'
            data-cy={`job-card-formatted-date-${job.id}`}
          >
            {formattedPostDate}
          </p>
        </div>
      </motion.li>
    </AnimatePresence>
  )
}

export default AdminJobCard
