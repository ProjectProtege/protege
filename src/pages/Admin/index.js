import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import { motion } from 'framer-motion'
import '../../assets/admin.css'

import AdminLayout from '../../layouts/AdminLayout'
import AdminJobCard from '../../components/admin/AdminJobCard'
import AdminReviewJob from '../../components/admin/AdminReviewJob'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const Admin = () => {
  const [activeJobs, setActiveJobs] = useState([])
  const [inactiveJobs, setInactiveJobs] = useState([])
  const [editJob, setEditJob] = useState()
  const [hasJob, setHasJob] = useState(false)

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
          companyName: job.companyName,
          postedAt: job.postedAt,
          approved: job.approved,
          status: job.status,
        }
      })
      setActiveJobs(jobList)
    })()
  }, [])

  useEffect(() => {
    ;(async function retrieveJobs() {
      const querySnapshot = await db
        .collection('jobs')
        .where('approved', '==', false)
        .orderBy('postedAt', 'desc')
        .get()

      const jobList = querySnapshot.docs.map((documentSnapshot) => {
        let doc = documentSnapshot
        let job = documentSnapshot.data()

        return {
          id: doc.id,
          jobTitle: job.jobtitle,
          companyName: job.companyName,
          postedAt: job.postedAt,
          approved: job.approved,
          status: job.status,
        }
      })
      setInactiveJobs(jobList)
    })()
  }, [])

  function onItemClick(id) {
    setEditJob(id)
    setHasJob(true)
  }

  return (
    <AdminLayout>
      <div className={`max-w-7xl flex flex-row`}>
        <motion.div
          data-hasjob={hasJob}
          className={`admin-joblist px-8 py-12 h-screen overflow-auto ${
            hasJob ? 'shadow-md' : null
          }`}
        >
          <h1 className='text-2xl font-medium text-blue-900 mb-6'>Dashboard</h1>

          <div className='mb-20'>
            <h2 className='text-xl font-medium text-teal-600 mb-6'>
              Approval pending
            </h2>
            <div className='px-5 py-3 justify-between grid grid-cols-12 gap-4 mb-4 text-blue-200 font-light'>
              <p className='col-span-4'>Job Title</p>

              <p className='col-span-3'>Company</p>

              <p className='col-span-2'>Date</p>

              <p className='col-span-2'>Status</p>

              <span className='col-span-1'></span>
            </div>
            <ul>
              {inactiveJobs.map((job) => (
                <AdminJobCard
                  key={job.id}
                  job={job}
                  onclick={onItemClick}
                  className='hover:cursor-pointer'
                />
              ))}
            </ul>
          </div>

          <div>
            <h2 className='text-xl font-medium text-teal-600 mb-6'>Approved</h2>
            <div className='px-5 py-3 justify-between grid grid-cols-12 gap-4 mb-4 text-blue-200 font-light'>
              <p className='col-span-4'>Job Title</p>

              <p className='col-span-3'>Company</p>

              <p className='col-span-2'>Date</p>

              <p className='col-span-2'>Status</p>

              <span className='col-span-1'></span>
            </div>

            <ul>
              {activeJobs.map((job) => (
                <AdminJobCard key={job.id} job={job} onclick={onItemClick} />
              ))}
            </ul>
          </div>
        </motion.div>

        {editJob ? (
          <div
            data-hasjob={hasJob}
            className={`admin-jobedit w-1/2 px-8 py-12 h-screen overflow-auto`}
          >
            <FontAwesomeIcon
              icon={faTimesCircle}
              onClick={(e) => {
                setEditJob('')
                setHasJob(false)
              }}
              className='cursor-pointer text-teal-700 opacity-75 transform hover:rotate-180 hover:opacity-100 duration-150 mb-3'
            />
            <AdminReviewJob id={editJob} />{' '}
          </div>
        ) : null}
      </div>
    </AdminLayout>
  )
}

export default Admin
