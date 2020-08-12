import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const AdminJobCard = ({ job }) => {
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
    months[postDate.getMonth()]
  }. ${postDate.getDate()}`

  return (
    <li className='bg-white px-5 py-3 shadow mb-6 rounded justify-between grid grid-cols-12 gap-4'>
      <p
        className='text-blue-900 font-bold col-span-4 truncate'
        data-cy={`job-card-job-title-${job.id}`}
      >
        {job.jobTitle}
      </p>

      <p
        className='text-blue-400 font-light col-span-3'
        data-cy={`job-card-company-name-${job.id}`}
      >
        {job.companyName}
      </p>

      <p
        className='text-blue-400 font-light col-span-2'
        data-cy={`job-card-formatted-date-${job.id}`}
      >
        {formattedPostDate}
      </p>

      <p
        className={`font-light rounded-full px-2 ${
          job.approved === true ? 'text-teal-700' : 'text-error opacity-75'
        } col-span-2`}
      >
        {job.approved === true ? 'Active' : 'Inactive'}
      </p>

      <button>
        <FontAwesomeIcon
          icon={faTimesCircle}
          className='text-error opacity-50 hover:opacity-100 transition ease-in-out duration-150 col-span-1'
        />
      </button>
    </li>
  )
}

export default AdminJobCard
