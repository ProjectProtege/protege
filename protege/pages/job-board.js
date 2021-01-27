import React from 'react'
import PropTypes from 'prop-types'
import { useJobs } from 'store/jobs_store'

import JobCard from '../components/job/JobCard'
// import LoadingSpinner from '../components/LoadingSpinner'

const JobBoard = () => {
  const jobs = useJobs((s) => s.jobs)

  // function filteredJobs(jobList, jobFilter) {
  //   const filtered = jobList.filter((job) => {
  //     return job.roleFocus === jobFilter
  //   })

  //   return filtered
  // }

  // const filterQueryParam = location.search
  //   .replace('?', '')
  //   .split('&')
  //   .find((qs) => qs[0] === 'f')

  // const initialFilterValue = filterQueryParam
  //   ? filterQueryParam.split('=')[1]
  //   : ''

  // const [jobFilter, setJobFilter] = useState(initialFilterValue)

  // useEffect(() => {
  //   setJobFilter(initialFilterValue)
  // }, [initialFilterValue])

  return (
    <div className='container '>
      <div className='w-full mx-auto lg:w-3/5'>
        <div className='flex justify-between items-center mb-6'>
          {/* <h1 className='mb-6 text-2xl font-medium text-teal-800'>
            {jobFilter ? `${jobFilter} Jobs` : 'All Jobs'}
          </h1> */}

          <h1 className='text-2xl font-medium text-teal-800'>Jobs</h1>

          <div className='relative w-1/2 md:w-1/4'>
            <label htmlFor='filter-by' className='sr-only'>
              Filter
            </label>

            <div className='select-wrap'>
              <select
                className='justify-end rounded-full input input-select'
                id='filter-by'
                placeholder='Filter By'
                // onChange={(event) => setJobFilter(event.target.value)}
                // value={jobFilter}
              >
                <option value=''>All</option>
                <option value='Front-end'>Front-end</option>
                <option value='Back-end'>Back-end</option>
                <option value='Full-stack'>Full-stack</option>
              </select>
            </div>
          </div>
        </div>

        {/* <LoadingSpinner loading={loading} /> */}

        <div data-cy='job-board-list' className='mx-auto'>
          {jobs.map((job, i) => (
            <JobCard key={job.id} job={job} i={i} />
          ))}
          {/* {!jobFilter && (
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
          )} */}
        </div>
      </div>
    </div>
  )
}

JobBoard.propTypes = {
  location: PropTypes.func.isRequired,
}

export default JobBoard
