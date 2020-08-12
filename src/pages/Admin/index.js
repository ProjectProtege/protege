import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'

import AdminLayout from '../../layouts/AdminLayout'
import AdminJobCard from '../../components/admin/AdminJobCard'

const Admin = () => {
  const [activeJobs, setActiveJobs] = useState([])
  const [inactiveJobs, setInactiveJobs] = useState([])
  const [loading, setLoading] = useState(true)

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
          approved: job.approved,
        }
      })
      setActiveJobs(jobList)
      setLoading(false)
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
          roleFocus: job.roleFocus,
          companyHQ: job.companyHQ,
          companyName: job.companyName,
          postedAt: job.postedAt,
          companyLogo: job.companyLogo,
          approved: job.approved,
        }
      })
      setInactiveJobs(jobList)
      setLoading(false)
    })()
  }, [])

  return (
    <AdminLayout>
      <div className='max-w-7xl mx-auto px-8 py-12'>
        <h1 className='text-2xl font-medium text-blue-900 mb-6'>Dashboard</h1>
        <div>
          <h2 className='text-xl font-medium text-teal-600 mb-6'>
            Approval pending
          </h2>
          <div className='px-5 py-3 justify-between grid grid-cols-12 gap-4 mb-4'>
            <p className='text-blue-400 font-light col-span-4'>Job Title</p>

            <p className='text-blue-400 font-light col-span-3'>Company</p>

            <p className='text-blue-400 font-light col-span-2'>Date Posted</p>

            <p className='text-blue-400 font-light col-span-2'>Status</p>

            <span className='col-span-1'></span>
          </div>
          <ul>
            {inactiveJobs.map((job) => (
              <AdminJobCard key={job.id} job={job} />
            ))}
          </ul>
        </div>

        <div>
          <h2 className='text-xl font-medium text-teal-600 mb-6'>Approved</h2>
          <div className='px-5 py-3 justify-between grid grid-cols-12 gap-4 mb-4'>
            <p className='text-blue-400 font-light col-span-4'>Job Title</p>

            <p className='text-blue-400 font-light col-span-3'>Company</p>

            <p className='text-blue-400 font-light col-span-2'>Date Posted</p>

            <p className='text-blue-400 font-light col-span-2'>Status</p>

            <span className='col-span-1'></span>
          </div>
          <ul>
            {activeJobs.map((job) => (
              <AdminJobCard key={job.id} job={job} />
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Admin
