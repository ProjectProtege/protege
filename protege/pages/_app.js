/* eslint-disable react/prop-types */

import GlobalLayout from 'layouts/GlobalLayout'
import 'assets/styles/globals.css'
import { useEffect } from 'react'
// import axios from 'axios'
import { db } from 'utils/db'
import { useJobs } from 'store/jobs_store'

function MyApp({ Component, pageProps }) {
  const setJobs = useJobs((s) => s.setJobs)

  useEffect(async () => {
    try {
      const entries = await db
        .collection('jobs')
        .orderBy('postedAt', 'desc')
        .get()

      const entriesData = entries.docs.map((documentSnapshot) => {
        const entry = documentSnapshot.data()
        const doc = documentSnapshot

        return {
          id: doc.id,
          jobTitle: entry.jobtitle,
          jobDescription: entry.jobDescription,
          roleFocus: entry.roleFocus,
          status: entry.status,
          companyHQ: entry.companyHQ,
          companyName: entry.companyName,
          postedAt: entry.postedAt.toDate(),
          companyLogo: entry.companyLogo,
          companyDescription: entry.companyDescription,
          howToApply: entry.howToApply,
          companyWebsite: entry.companyWebsite,
          positionType: entry.positionType,
          paid: entry.paid,
          approved: entry.approved,
        }
      })

      setJobs(entriesData)
    } catch (err) {
      alert('Oops! Something went wrong.')
    }
  }, [])

  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  )
}

export default MyApp
