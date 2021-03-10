/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import Head from 'next/head'
import { AuthProvider } from 'store/AuthContext'
import { Toaster } from 'react-hot-toast'
import GlobalLayout from 'layouts/GlobalLayout'
import { useJobs } from 'store/jobs_store'
import { db, analytics } from 'utils/db'
import 'assets/styles/globals.css'
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

function MyApp({ Component, pageProps }) {
  const setJobs = useJobs((s) => s.setJobs)

  // TODO: Get analytics working again!!
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      analytics()
    }
  }, [])

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
          // postedAt: entry.postedAt.toDate(),
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
      console.log('Oops! Something went wrong:', err.message)
    }
  }, [])

  return (
    <AuthProvider>
      <GlobalLayout>
        <Head>
          <title>Protegé.dev</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Toaster position='top-center' />
        <Component {...pageProps} />
      </GlobalLayout>
    </AuthProvider>
  )
}

export default MyApp
