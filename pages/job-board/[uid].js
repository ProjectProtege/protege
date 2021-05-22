import Link from 'next/link'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useJobs } from 'store/jobs_store'

import BackArrow from 'assets/images/icons/back-arrow'
import JobTemplate from '../../components/job/JobTemplate'

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
    <div className='flex flex-col container justify-center w-full lg:max-w-4xl'>
      <Link href='/job-board'>
        <a className='w-3/4 md:w-1/3 text-teal-600 hover:text-teal-800 mb-3 md:mb-6'>
          <BackArrow className='inline-block -mt-1' />
          <span data-cy='back-to-job-list' className='pl-2 font-semibold'>
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
