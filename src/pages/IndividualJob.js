import React, { useState, useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import JobTemplate from '../components/JobTemplate'
import { db } from '../firebase/firebase'
import Layout from '../layouts/Layout'

import BackArrow from '../assets/images/svg/back-arrow'

const IndividualJobPage = () => {
  const [job, setJob] = useState()

  const {
    params: { id },
  } = useRouteMatch()

  useEffect(() => {
    const docRef = db.collection('jobs').doc(id)

    docRef.get().then(function (res) {
      console.log(res)

      if (res.exists) {
        setJob(res.data())
        console.log(res.data())
      } else {
        return null
      }
    })
  }, [id])

  if (!job) return null

  return (
    <Layout>
      <div className='flex flex-col pt-24 md:pt-32 px-3 lg:px-0 mx-auto container justify-center lg:w-1/2'>
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
      </div>
    </Layout>
  )
}

export default IndividualJobPage
