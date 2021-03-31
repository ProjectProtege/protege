import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useJobs } from 'store/jobs_store'
import { useJobForm } from 'store/job-post_store'

import FindYourNext from 'components/home/FindYourNext'
import JobCard from 'components/job/JobCard'
import TierSelect from 'components/form/TierSelect'

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
        className='absolute inset-0 hidden w-full lg:block'
        alt=''
        style={{ zIndex: '-999999' }}
        layout='fill'
        objectFit='contain'
      />

      <h1 className='sr-only'>
        Protege.dev | Remote jobs for junior developers
      </h1>

      <section>
        <FindYourNext />

        <div className='flex flex-col mx-auto mt-12 text-center text-blue-900 md:w-3/4 md:tracking-wide lg:w-3/4 xl:w-1/2 md:text-lg'>
          <h2 className='mb-4 font-semibold md:text-2xl'>
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

      <section className='max-w-2xl min-h-screen mx-auto mt-12 mb-32 lg:pt-16max-w-2xl'>
        <h2 className='mb-8 text-2xl text-center text-blue-900'>
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
        <h2 className='mb-8 text-2xl leading-normal text-center text-blue-500'>
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

          <Link href={`/post-a-job?status=1&tier=${tier}`}>
            <a className='mt-3 btn btn-teal'>Post a Job</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
