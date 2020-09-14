import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FindYourNext from '../components/home/FindYourNext'
import JobCard from '../components/job/JobCard'
import heroBG from '../assets/images/hero-bg-pattern.png'
import { db } from '../firebase/firebase'
import TierSelect from '../components/form/TierSelect'
import LoadingSpinner from '../components/LoadingSpinner'

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
        let doc = documentSnapshot
        let job = documentSnapshot.data()

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

  function activeJobs(jobs) {
    const activeJobs = jobs.filter((job) => {
      return job.status !== 'inactive'
    })

    return activeJobs
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
      <motion.img
        animate={{
          opacity: [0, 1],
        }}
        transition={{
          delay: 0.1,
          duration: 0.25,
        }}
        src={heroBG}
        alt=''
        className='hidden md:block absolute top-0 left-0 w-full'
      />

      <div className='relative pt-20 lg:pt-32 px-2'>
        <motion.div
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

          <div className='flex md:w-3/4 flex-col text-center mx-auto mt-4'>
            <p className='md:tracking-wide lg:w-3/4 xl:w-1/2 mx-auto md:text-lg text-blue-700 mb-6'>
              <span className='md:text-2xl font-medium'>
                Remote jobs for junior developers.
              </span>
              <br />
              Looking for your next junior developer role? Look no further! Any
              jobs listed here are geared for those hungry to work and learn.
            </p>

            <button className='btn btn-teal mx-auto' type='button'>
              <Link to='/job-board'>Find a Job</Link>
            </button>
          </div>
        </motion.div>

        <motion.div
          className='mt-12 mb-32 lg:pt-16 mx-auto min-h-screen'
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
          <h2 className='text-center text-2xl text-blue-900 font-semibold mb-8'>
            Latest Opportunities
          </h2>

          <LoadingSpinner loading={loading} />

          <motion.div
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
          </motion.div>
        </motion.div>

        <div className='flex flex-col items-center'>
          <h2 className='text-center text-2xl text-blue-500 font-bold leading-normal mb-8'>
            Broadcast to unmatched ambition,
            <br />
            <span className='text-teal-700 text-5xl tracking-wide'>
              Affordably.
            </span>
          </h2>

          <TierSelect receivingTierClick={receivingTierClick} tier={tier} />

          <div className='mt-6 flex flex-col items-center'>
            <h3 className='text-lg text-blue-300 text-center'>
              Get started on your candidate search today.
            </h3>

            <Link to={`/post-a-job?s=1&t=${tier}`}>
              <button className='btn btn-teal mt-3' type='button'>
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
