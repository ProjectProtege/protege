import { useState, useEffect } from 'react'
import { useJobs } from 'store/jobs_store'
import { useRouter } from 'next/router'

import JobCard from '../../components/job/JobCard'

const JobBoard = () => {
  const router = useRouter()
  const [activeJobs, setActiveJobs] = useState([])

  const filterParam = router.query.filter
  const [jobFilter, setJobFilter] = useState(filterParam)
  const jobs = useJobs((s) => s.jobs)

  function filteredJobs(jobList, filter) {
    const filtered = jobList.filter((job) => {
      return (
        job.roleFocus === filter &&
        job.status !== 'inactive' &&
        job.paid === true &&
        job.approved === true
      )
    })

    return filtered
  }

  function getActiveJobs(jobList) {
    const active = jobList.filter((job) => {
      return (
        job.status !== 'inactive' && job.paid === true && job.approved === true
      )
    })

    return active
  }

  function handleOptionChange(event) {
    if (event.target.value === '') {
      router.replace('/job-board')
    } else {
      router.replace(`/job-board?filter=${event.target.value}`)
    }
    setJobFilter(event.target.value)
  }

  useEffect(() => {
    setJobFilter(filterParam)
  }, [filterParam])

  return (
    <div className='container'>
      <div className='w-full mx-auto lg:max-w-4xl'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl'>
            {jobFilter ? `${jobFilter} Jobs` : 'All Jobs'}
          </h1>

          <div className='relative w-1/2 md:w-1/4'>
            <label htmlFor='filter-by' className='sr-only'>
              Filter
            </label>

            <div className='select-wrap'>
              <select
                className='justify-end rounded-md input input-select'
                id='filter-by'
                placeholder='Filter By'
                onChange={handleOptionChange}
                value={jobFilter || ''}
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
          {!jobFilter && (
            <>
              {getActiveJobs(jobs).map((job, i) => (
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
        </div>
      </div>
    </div>
  )
}

export default JobBoard
