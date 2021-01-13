import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import FindYourNext from '../components/home/FindYourNext'
import JobCard from '../components/job/JobCard'
// import heroBG from '../assets/images/hero-bg-pattern.png'
import { db } from '../firebase/firebase'
// import TierSelect from '../components/form/TierSelect'
// import LoadingSpinner from '../components/LoadingSpinner'

const Home = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const [tier, setTier] = useState(process.env.REACT_APP_ADVANCED_PLAN)
  function receivingTierClick(e) {
    setTier(e)
  }

  useEffect(() => {
    ;(async function retrieveJobs() {
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
      setJobs(jobList)
      setLoading(false)
    })()
  }, [])

  function activeJobs(jobsList) {
    const active = jobsList.filter((job) => {
      return job.status !== 'inactive'
    })

    return active
  }

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
    <div>
      {/* <img
        animate={{
          opacity: [0, 1],
        }}
        transition={{
          delay: 0.1,
          duration: 0.25,
        }}
        src={heroBG}
        alt=''
        className='absolute top-0 left-0 hidden w-full md:block'
      /> */}

      <div className='relative px-2 pt-20 lg:pt-32'>
        <div
          animate={{
            opacity: [0, 1],
            y: [-10, 0],
          }}
          transition={{
            duration: 0.2,
            delay: 0.2,
          }}
        >
          <FindYourNext />

          <div className='flex flex-col mx-auto mt-4 text-center md:w-3/4'>
            <p className='mx-auto mb-6 text-blue-700 md:tracking-wide lg:w-3/4 xl:w-1/2 md:text-lg'>
              <span className='font-medium md:text-2xl'>
                Remote jobs for junior developers.
              </span>
              <br />
              Looking for your next junior developer role? Look no further! Any
              jobs listed here are geared for those hungry to work and learn.
            </p>

            <button className='mx-auto btn btn-teal' type='button'>
              <Link to='/job-board'>Find a Job</Link>
            </button>
          </div>
        </div>

        <div
          className='min-h-screen mx-auto mt-12 mb-32 lg:pt-16'
          style={{ maxWidth: 680 }}
          animate={{
            opacity: [0, 1],
            y: [-10, 0],
          }}
          transition={{
            delay: 0.3,
            duration: 0.15,
          }}
        >
          <h2 className='mb-8 text-2xl font-semibold text-center text-blue-900'>
            Latest Opportunities
          </h2>

          <LoadingSpinner loading={loading} />

          <div
            data-cy='job-card-container'
            className='container'
            variants={container}
            initial='hidden'
            animate='show'
          >
            {activeJobs(jobs)
              .slice(0, 6)
              .map((job, i) => (
                <JobCard key={job.id} job={job} i={i} />
              ))}
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <h2 className='mb-8 text-2xl font-bold leading-normal text-center text-blue-500'>
            Broadcast to unmatched ambition,
            <br />
            <span className='text-5xl tracking-wide text-teal-800'>
              Affordably.
            </span>
          </h2>

          <TierSelect receivingTierClick={receivingTierClick} tier={tier} />

          <div className='flex flex-col items-center mt-6'>
            <h3 className='text-lg text-center text-blue-700'>
              Get started on your candidate search today.
            </h3>

            <Link to={`/post-a-job?s=1&t=${tier}`}>
              <button className='mt-3 btn btn-teal' type='button'>
                Post a Job
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
