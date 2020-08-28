import React, { useState, useEffect } from 'react'
import JobCard from '../components/JobCard'
import { db } from '../firebase/firebase'
import { motion } from 'framer-motion'
import Layout from '../layouts/Layout'
import LoadingSpinner from '../components/LoadingSpinner'

const JobBoard = ({ location }) => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async function retrieveJobs() {
      const querySnapshot = await db
        .collection('jobs')
        .where('approved', '==', true)
        .orderBy('postedAt', 'desc')
        .get()

      const jobList = querySnapshot.docs.map((documentSnapshot) => {
        let doc = documentSnapshot
        let job = documentSnapshot.data()

        return {
          id: doc.id,
          jobTitle: job.jobtitle,
          roleFocus: job.roleFocus,
          companyHQ: job.companyHQ,
          companyName: job.companyName,
          postedAt: job.postedAt,
          companyLogo: job.companyLogo,
        }
      })
      setJobs(jobList)
      setLoading(false)
    })()
  }, [])

  function filteredJobs(jobs, jobFilter) {
    const filteredJobs = jobs.filter((job) => {
      return job.roleFocus === jobFilter
    })

    return filteredJobs
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

  return (
    <Layout>
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

          <LoadingSpinner loading={loading}/>
          
          <motion.div
            data-cy='job-board-list'
            className='mx-auto'
            animate={{
              opacity: [0, 1],
              y: [-10, 0],
            }}
            transition={{
              ease: 'easeIn',
              type: 'spring',
              duration: 0.25,
              delay: 0.075,
            }}
          >
            {!jobFilter && (
              <React.Fragment>
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </React.Fragment>
            )}

            {jobFilter && (
              <React.Fragment>
                {filteredJobs(jobs, jobFilter).map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </React.Fragment>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default JobBoard
