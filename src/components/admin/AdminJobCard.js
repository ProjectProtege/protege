import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'

const AdminJobCard = ({ job, onclick }) => {
  const [status, setStatus] = useState('')

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
    <li
      className='bg-white px-5 py-3 shadow mb-6 border-l-2 border-teal-500 justify-between grid grid-cols-12 gap-4 cursor-pointer'
      onClick={handleClick}
    >
      <p
        className='text-blue-900 font-bold col-span-4 truncate'
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

      <p
        className='text-blue-400 font-light col-span-2 truncate'
        data-cy={`job-card-formatted-date-${job.id}`}
      >
        {formattedPostDate}
      </p>

      <p
        className={`font-light rounded-full px-2 ${
          status === 'active'
            ? 'text-teal-700'
            : status === 'inactive'
            ? 'text-error opacity-75'
            : 'text-gray-500'
        } col-span-2 capitalize truncate`}
      >
        {status}
      </p>

      <div className='col-span-1 flex justify-end'>
        <button>
          <FontAwesomeIcon
            icon={faEdit}
            className='text-teal-900 opacity-50 hover:opacity-100 transition ease-in-out duration-150 mr-3'
          />
        </button>
        <button>
          <FontAwesomeIcon
            icon={faTimes}
            className='text-error opacity-50 hover:opacity-100 transition ease-in-out duration-150'
          />
        </button>
      </div>
    </li>
  )
}

export default AdminJobCard
