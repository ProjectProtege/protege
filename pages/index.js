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
        className='absolute inset-0 hidden w-full lg:block'
        alt=''
        style={{ zIndex: '-999999' }}
      />

      <h1 className='sr-only'>Home</h1>

      <section className='pt-12'>
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

      <section
        className='min-h-screen mx-auto mt-12 mb-32 lg:pt-16'
        style={{ maxWidth: 680 }}
      >
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

      <section className='flex flex-col items-center'>
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
      </section>

      <section className='grid md:grid-cols-2 gap-12 my-24 container mx-auto'>
        <div className='mb-12 md:mb-0'>
          <h2 className='text-3xl mb-6 capitalize'>
            Not your average job board
          </h2>

          <div className='opacity-75 text-lg md:ml-10 leading-loose'>
            <p>
              Protegé&apos;s mission is to reach beyond that of just a job
              board. Our goal is to champion the junior developer at as many of
              the steps of the hiring process as possible.
            </p>

            <p className='mt-6'>
              Watch this live panel our founder was a part of, hosted by{' '}
              <a
                className='text-teal-800 underline font-semibold'
                href='https://virtualcoffee.io'
              >
                VirtualCoffee
              </a>
              , where they discussed some of the struggles juniors commonly face
              during the hiring process and what we&apos;re doing to help.
            </p>
          </div>
        </div>

        <div className='md:mt-16'>
          <div className='video-wrapper'>
            <iframe
              width='560'
              height='315'
              src='https://www.youtube.com/embed/PDytThYBSvA'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
