import React, { useState, useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import JobTemplate from '../components/job/JobTemplate'
import { db } from '../firebase/firebase'
import Layout from '../layouts/Layout'
import { motion } from 'framer-motion'

import BackArrow from '../assets/images/svg/back-arrow'

const IndividualJobPage = () => {
  const [job, setJob] = useState()

  const {
    params: { id },
  } = useRouteMatch()

  useEffect(() => {
    const docRef = db.collection('jobs').doc(id)

    docRef.get().then(function (res) {
      if (res.exists) {
        setJob(res.data())
      } else {
        return null
      }
    })
  }, [id])

  if (!job) return null

  return (
    <Layout>
      <motion.div
        animate={{
          opacity: [0, 1],
          y: [-10, 1],
        }}
        transition={{
          delay: 0.15,
          duration: 0.3,
          ease: 'easeIn',
        }}
        className='flex flex-col pt-24 md:pt-32 px-3 lg:px-0 mx-auto container justify-center lg:w-1/2'
      >
        <Link
          className='flex items-center text-teal-600 mb-3 md:mb-6'
          to={ROUTES.JOB_BOARD}
        >
          <BackArrow />
          <span data-cy='back-to-job-list' className='pl-2 mt-1 font-medium'>
            Back to Job List
          </span>
        </Link>

        <JobTemplate props={job} />
      </motion.div>
    </Layout>
  )
}

export default IndividualJobPage
