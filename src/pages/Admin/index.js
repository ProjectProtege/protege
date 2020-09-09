import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import '../../assets/css/admin.css'
import { motion } from 'framer-motion'

import AdminLayout from '../../layouts/AdminLayout'
import AdminJobCard from '../../components/admin/AdminJobCard'
import AdminReviewJob from '../../components/admin/AdminReviewJob'
import AdminNotification from '../../components/admin/AdminNotification'

import CloseIcon from '../../assets/images/svg/close-icon'

const Admin = () => {
  const [activeJobs, setActiveJobs] = useState([])
  const [inactiveJobs, setInactiveJobs] = useState([])
  const [editJob, setEditJob] = useState()
  const [hasJob, setHasJob] = useState(false)
  const [recentEdit, setRecentEdit] = useState()
  const [notificationRes, setNotificationRes] = useState(false)
  const [notificationId, setNotificationId] = useState()

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

  useEffect(() => {
    retrieveInactiveJobs()
    retrieveActiveJobs()
  }, [])

  async function retrieveInactiveJobs() {
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
  }

  async function retrieveActiveJobs() {
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
  }

  async function deleteJobForever(id) {
    const docDeleteRef = await db.collection('jobs').doc(id)

    return docDeleteRef
      .delete()
      .then(() => {
        setNotificationId(id)
        setNotificationRes(true)
        setHasJob(false)
        setEditJob('')
        retrieveActiveJobs()
        retrieveInactiveJobs()
      })
      .catch((err) => {
        setNotificationId(id)
        setNotificationRes(false)
      })
  }

  function onItemClick(id) {
    setEditJob(id)
    setHasJob(true)
    setRecentEdit('')
    setNotificationRes(false)
  }

  function receivingEdit(res) {
    setRecentEdit(res)
    retrieveActiveJobs()
    retrieveInactiveJobs()
    setNotificationRes(false)
  }

  function receivingNotification(id, res) {
    setNotificationId(id)
    setNotificationRes(res)
  }

  return (
    <AdminLayout>
      {notificationId && (
        <AdminNotification
          notificationId={notificationId}
          notificationRes={notificationRes}
        />
      )}

      <div className={`max-w-7xl flex flex-row`}>
        <div
          data-hasjob={hasJob}
          className={`admin-joblist px-8 py-12 h-screen overflow-y-auto overflow-x-hidden ${
            hasJob ? 'shadow-md' : null
          }`}
        >
          <h1 className='text-2xl font-medium text-blue-900 mb-6'>Dashboard</h1>

          <div className='mb-20'>
            <h2 className='text-xl font-medium text-teal-600 mb-6'>
              Approval pending
            </h2>
            <div className='px-5 py-3 justify-between grid grid-cols-12 gap-4 mb-2 text-blue-200 font-light'>
              <p className='col-span-5'>Job Title</p>
              <p className='col-span-3'>Company</p>
              <p className='col-span-2'>Status</p>
              <div className='col-span-2 flex justify-end pr-2'>
                <p className='col-span-2'>Post Date</p>
              </div>

              <span className='col-span-1'></span>
            </div>
            <motion.ul variants={container} initial='hidden' animate='show'>
              {inactiveJobs.map((job, i) => (
                <AdminJobCard
                  key={job.id}
                  job={job}
                  i={i}
                  onclick={onItemClick}
                  deleteJobForever={deleteJobForever}
                  className='hover:cursor-pointer'
                />
              ))}
            </motion.ul>
          </div>

          <div>
            <h2 className='text-xl font-medium text-teal-600 mb-6'>Approved</h2>
            <div className='px-5 py-3 justify-between grid grid-cols-12 gap-4 mb-2 text-blue-200 font-light'>
              <p className='col-span-5'>Job Title</p>
              <p className='col-span-3'>Company</p>
              <p className='col-span-2'>Status</p>
              <div className='col-span-2 flex justify-end pr-2'>
                <p className='col-span-2'>Post Date</p>
              </div>

              <span className='col-span-1'></span>
            </div>
            <motion.ul variants={container} initial='hidden' animate='show'>
              {activeJobs.map((job, i) => (
                <AdminJobCard
                  key={job.id}
                  job={job}
                  i={i}
                  onclick={onItemClick}
                  deleteJobForever={deleteJobForever}
                  className='hover:cursor-pointer'
                />
              ))}
            </motion.ul>
          </div>
        </div>

        {editJob ? (
          <div
            data-hasjob={hasJob}
            className={`admin-jobedit w-1/2 px-8 py-12 h-screen overflow-auto`}
          >
            <button
              className='focus:outline-none text-teal-700 opacity-75 transform hover:rotate-180 hover:opacity-100 duration-150 mb-3 w-4 h-4'
              onClick={() => {
                setEditJob('')
                setHasJob(false)
                setRecentEdit('')
              }}
            >
              <CloseIcon />
            </button>
            <AdminReviewJob
              id={editJob}
              receivingEdit={receivingEdit}
              receivingNotification={receivingNotification}
              deleteJobForever={deleteJobForever}
            />{' '}
          </div>
        ) : null}
      </div>
    </AdminLayout>
  )
}

export default Admin
