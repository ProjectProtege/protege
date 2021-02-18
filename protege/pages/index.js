import Link from 'next/link'
import { useJobs } from 'store/jobs_store'
import { useJobForm } from 'store/job-post_store'

import FindYourNext from 'components/home/FindYourNext'
import JobCard from 'components/job/JobCard'
import TierSelect from 'components/form/TierSelect'

// import { db } from 'firebase/firebase'

const Home = () => {
  const jobs = useJobs((s) => s.jobs)
  const tier = useJobForm((s) => s.tier)

  function activeJobs(jobList) {
    const active = jobList.filter((job) => {
      return (
        job.status !== 'inactive' && job.paid === true && job.approved === true
      )
    })

    return active
  }

  return (
    <div>
      <img
        src='/hero-bg-pattern.png'
        className='hidden lg:block absolute inset-0 w-full'
        alt=''
        style={{ zIndex: '-999999' }}
      />

      <h1 className='sr-only'>Home</h1>

      <section className='pt-12'>
        <FindYourNext />

        <div className='flex flex-col mx-auto mt-12 text-center md:w-3/4 text-blue-900 md:tracking-wide lg:w-3/4 xl:w-1/2 md:text-lg'>
          <h2 className='font-medium md:text-2xl mb-4'>
            Remote jobs for junior developers.
          </h2>

          <p className='mx-auto mb-8 opacity-75'>
            Looking for your next junior developer role? Look no further! Any
            jobs listed here are geared for those hungry to work and learn.
          </p>

          <Link href='/job-board'>
            <a className='mx-auto btn btn-teal'>Find a Job</a>
          </Link>
        </div>
      </section>

      <section
        className='min-h-screen mx-auto mt-12 mb-32 lg:pt-16'
        style={{ maxWidth: 680 }}
      >
        <h2 className='mb-8 text-2xl font-semibold text-center text-blue-900'>
          Latest Opportunities
        </h2>

        <div data-cy='job-card-container' className='container'>
          {activeJobs(jobs)
            .slice(0, 6)
            .map((job, i) => (
              <JobCard key={job.id} job={job} i={i} />
            ))}
        </div>
      </section>

      <div className='flex flex-col items-center'>
        <h2 className='mb-8 text-2xl font-bold leading-normal text-center text-blue-500'>
          Broadcast to unmatched ambition,
          <br />
          <span className='text-5xl tracking-wide text-teal-800'>
            Affordably.
          </span>
        </h2>

        <TierSelect />

        <div className='flex flex-col items-center mt-6'>
          <h3 className='text-lg text-center text-blue-700'>
            Get started on your candidate search today.
          </h3>

          <Link href={`/post-a-job?s=1&t=${tier}`}>
            <a className='mt-3 btn btn-teal'>Post a Job</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
