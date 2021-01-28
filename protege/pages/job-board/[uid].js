import Link from 'next/link'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useJobs } from 'store/jobs_store'
import JobTemplate from '../../components/job/JobTemplate'

// import BackArrow from '../assets/images/svg/back-arrow'

export function getServerSideProps(context) {
  return {
    props: { params: context.params },
  }
}

const Entry = ({ params }) => {
  const jobs = useJobs((s) => s.jobs)

  const [job, setJob] = useState({})

  const uid = params.uid.toString()

  useEffect(() => {
    const filteredJob = jobs.filter((item) => {
      return item.id === uid
    })

    setJob(filteredJob[0])
  }, [jobs])

  if (!job) return null

  return (
    <div className='flex flex-col px-3 lg:px-0 mx-auto container justify-center lg:w-1/2'>
      <Link href='/job-board'>
        <a className='flex items-center text-teal-600 hover:text-teal-800 mb-3 md:mb-6'>
          <span data-cy='back-to-job-list' className='pl-2 mt-1 font-medium'>
            Back to Job List
          </span>
        </a>
      </Link>

      <JobTemplate props={job} />
    </div>
  )
}

Entry.propTypes = {
  params: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
}

export default Entry
