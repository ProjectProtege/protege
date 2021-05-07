import { useState, useEffect } from 'react'
import { db } from 'utils/db'
import PropTypes from 'prop-types'
import { useJobs } from 'store/jobs_store'

import Link from 'next/link'
import Cancel from 'assets/images/icons/cancel'
import toast from 'react-hot-toast'

const ApplicationItem = ({ job }) => {
  const [jobData, setJobData] = useState()
  const jobs = useJobs((s) => s.jobs)

  useEffect(() => {
    const jobInfo = jobs.filter((item) => {
      return item.id === job.jobId
    })

    setJobData(jobInfo[0])
  }, [jobs])

  const cancelApplication = async () => {
    try {
      await db.collection('applications').doc(job.id).delete()
      toast.success('Application removed.')
    } catch {
      toast.error('Oops, something went wrong. Try again!')
    }
  }

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

  const postDate = job.applicationDate

  const formattedPostDate = `${
    months[postDate.getMonth()]
  } ${postDate.getDate()}`

  return (
    <li>
      <div className='grid items-center mb-4 p-3 text-sm bg-white border-l-4 border-teal-500 rounded shadow grid-cols-12'>
        <p className='col-span-4 font-bold'>
          <Link href={`/job-board/${job.jobId}`}>
            <a className='font-semibold'>{jobData?.jobtitle}</a>
          </Link>
        </p>

        <p className='col-span-3 text-blue-600'>{jobData?.companyName}</p>

        <p className='col-span-2 text-blue-600'>{formattedPostDate}</p>

        <p className='col-span-1 uppercase'>
          {job.viewed ? (
            <span className='text-green-700'>Viewed</span>
          ) : (
            <span>Sent</span>
          )}
        </p>

        <button
          className='col-span-2 text-right text-red-600 flex justify-end items-center'
          onClick={cancelApplication}
          type='button'
        >
          <Cancel className='w-5 h-5 inline-block mr-2' />{' '}
          <span>Cancel Application</span>
        </button>
      </div>
    </li>
  )
}

ApplicationItem.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    candidateId: PropTypes.string.isRequired,
    jobId: PropTypes.string.isRequired,
    viewed: PropTypes.bool.isRequired,
    applicationDate: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
}

export default ApplicationItem
