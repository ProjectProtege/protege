import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import JobCard from '../components/job/JobCard'
import { db } from '../firebase/firebase'
import LoadingSpinner from '../components/LoadingSpinner'

const JobBoard = ({ location }) => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  async function retrieveJobs() {
    const querySnapshot = await db
      .collection('jobs')
      .where('approved', '==', true)
      .orderBy('postedAt', 'desc')
      .get()

    const jobList = querySnapshot.docs.map((documentSnapshot) => {
      const doc = documentSnapshot
      const job = documentSnapshot.data()

      return {
        id: doc.id,
        jobTitle: job.jobtitle,
        roleFocus: job.roleFocus,
        status: job.status,
        companyHQ: job.companyHQ,
        companyName: job.companyName,
        postedAt: job.postedAt,
        companyLogo: job.companyLogo,
      }
    })

    const active = jobList.filter((job) => {
      return job.status !== 'inactive'
    })

    setJobs(active)
    setLoading(false)
  }

  /**
   * Retrieves all active jobs from firebase
   */
  useEffect(() => {
    retrieveJobs()
  }, [])

  function filteredJobs(jobList, jobFilter) {
    const filtered = jobList.filter((job) => {
      return job.roleFocus === jobFilter
    })

    return filtered
  }

  const filterQueryParam = location.search
    .replace('?', '')
    .split('&')
    .find((qs) => qs[0] === 'f')

  const initialFilterValue = filterQueryParam
    ? filterQueryParam.split('=')[1]
    : ''

  const [jobFilter, setJobFilter] = useState(initialFilterValue)

  useEffect(() => {
    setJobFilter(initialFilterValue)
  }, [initialFilterValue])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delay: 0.25,
      },
    },
  }

  return (
    <div className='container mx-auto pt-32 px-2 md:px-0 min-h-screen'>
      <div className='w-full lg:w-3/5 mx-auto'>
        <motion.div
          className='flex justify-between mb-6'
          animate={{
            y: [-10, 0],
            opacity: [0, 1],
          }}
          transition={{
            duration: 0.2,
            ease: 'easeIn',
          }}
        >
          <h1 className='text-2xl font-medium text-teal-600 mb-6'>
            {jobFilter ? `${jobFilter} Jobs` : 'All Jobs'}
          </h1>

          <div className='w-1/2 md:w-1/4 relative'>
            <label htmlFor='filter-by' className='sr-only'>
              Filter
            </label>

            <div className='select-wrap'>
              <select
                className='input input-select rounded-none justify-end'
                id='filter-by'
                placeholder='Filter By'
                onChange={(event) => setJobFilter(event.target.value)}
                value={jobFilter}
              >
                <option value=''>All</option>
                <option value='Front-end'>Front-end</option>
                <option value='Back-end'>Back-end</option>
                <option value='Full-stack'>Full-stack</option>
              </select>
            </div>
          </div>
        </motion.div>

        <LoadingSpinner loading={loading} />

        <motion.div
          data-cy='job-board-list'
          className='mx-auto'
          variants={container}
          initial='hidden'
          animate='show'
        >
          {!jobFilter && (
            <>
              {jobs.map((job, i) => (
                <JobCard key={job.id} job={job} i={i} />
              ))}
            </>
          )}

          {jobFilter && (
            <>
              {filteredJobs(jobs, jobFilter).map((job, i) => (
                <JobCard key={job.id} job={job} i={i} />
              ))}
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

JobBoard.propTypes = {
  location: PropTypes.func.isRequired,
}

export default JobBoard
