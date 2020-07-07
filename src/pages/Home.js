import React, { useState, useEffect } from 'react'
import FindYourNext from '../components/FindYourNext'
import JobCard from '../components/JobCard'
import heroBG from '../assets/images/hero-bg-pattern.png'
import { db } from '../firebase/firebase'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../layouts/Layout'

const Home = () => {
  const [jobs, setJobs] = useState([])

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
    })()
  }, [])

  return (
    <Layout variant='home'>
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
                Looking for your next junior developer role? Look no further!
                Any jobs listed here are geared for those hungry to work and
                learn.
              </p>

              <button className='btn btn-teal mx-auto'>
                <Link to='/job-board'>Find a Job</Link>
              </button>
            </div>
          </motion.div>

          <motion.div
            className='mt-12 lg:pt-16 mx-auto min-h-screen'
            style={{ maxWidth: 680 }}
            animate={{
              opacity: [0, 1],
              y: [-10, 0],
            }}
            transition={{
              delay: 0.3,
              duration: 0.15,
              staggerChildren: 0.2,
            }}
          >
            <h2 className='text-center text-2xl text-blue-900 font-semibold mb-8'>
              Latest Opportunities
            </h2>

            <div data-cy='job-card-container' className='container'>
              {jobs.slice(0, 6).map((job, index) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
