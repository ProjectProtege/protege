import PropTypes from 'prop-types'
import { db } from 'utils/db'
import Link from 'next/link'

import Trash from 'assets/images/icons/trash'
import Edit from 'assets/images/icons/edit'
import Archive from 'assets/images/icons/archive'

import { useEditJob } from 'store/edit-job_store'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const JobItem = ({ job, archiveJob, deleteJob }) => {
  const router = useRouter()
  const [applicants, setApplicants] = useState()
  const setEditJob = useEditJob((s) => s.setEditJob)
  const { displayName } = router.query

  useEffect(() => {
    async function fetchApplications() {
      const applications = await db
        .collection('applications')
        .where('jobId', '==', job.id)
        .get()

      const applicationData = applications.docs.map((documentSnapshot) => {
        const entry = documentSnapshot.data()
        const doc = documentSnapshot

        return {
          id: doc.id,
          candidateId: entry.candidateId,
          jobId: entry.jobId,
        }
      })
      setApplicants(applicationData)
    }

    fetchApplications()
  }, [])

  const editJob = () => {
    setEditJob({ job })
    router.push(`/company/${displayName}/${job.id}/edit`)
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

  const postDate = job.postedAt

  const formattedPostDate = `${
    months[postDate.getMonth()]
  } ${postDate.getDate()}, ${postDate.getFullYear()}`

  return (
    <li className='grid items-center mb-4 p-3 text-sm bg-white border-l-4 border-teal-500 rounded shadow grid-cols-12 gap-6'>
      <p className='col-span-8 md:col-span-5 font-bold'>
        <div className='truncate'>
          <Link href={`/company/${displayName}/${job.id}`}>
            <a className='font-semibold'>{job.jobtitle}</a>
          </Link>
        </div>
      </p>
      <p className='col-span-4 md:col-span-2 opacity-75 text-right md:text-left'>
        {applicants?.length}
      </p>
      <p className='hidden md:block col-span-2 opacity-75'>
        {formattedPostDate}
      </p>
      <p
        className={`hidden md:block col-span-1 capitalize ${
          job.status === 'active' ? 'text-green-600' : 'text-error-full'
        }`}
      >
        {job.status}
      </p>
      <div className='hidden md:flex col-span-2 items-center justify-end'>
        {job.status === 'active' && (
          <button
            className='opacity-50 hover:opacity-100 mr-6'
            type='button'
            onClick={editJob}
          >
            <Edit />
          </button>
        )}
        {job.status === 'active' ? (
          <button
            className='opacity-50 hover:opacity-100 text-error-full'
            type='button'
            onClick={() => {
              archiveJob(job.id)
            }}
          >
            <Archive />
          </button>
        ) : (
          <button
            className='opacity-50 hover:opacity-100 text-error-full'
            type='button'
            onClick={() => {
              if (
                // eslint-disable-next-line no-alert
                window.confirm(
                  'This is permanant action. Are you sure you want to delete this job?'
                )
              )
                deleteJob(job.id)
            }}
          >
            <Trash />
          </button>
        )}
      </div>
    </li>
  )
}

JobItem.propTypes = {
  job: PropTypes.shape({
    jobtitle: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    postedAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  archiveJob: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
}

export default JobItem
