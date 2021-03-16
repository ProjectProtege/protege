/* eslint-disable react/prop-types */
import Head from 'next/head'
import GlobalLayout from 'layouts/GlobalLayout'
import 'assets/styles/globals.css'
import { useEffect } from 'react'
import { db, analytics } from 'utils/db'
import { useJobs } from 'store/jobs_store'

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
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content='Remote job opportunities for junior developers'
        />
        <link rel='apple-touch-icon' href='/protege-logo.png' />

        <meta property='og:title' content='Protege.dev' />
        <meta
          property='og:description'
          content='Remote Jobs for Junior Developers'
        />
        <meta property='og:image' content='/og-image.jpg' />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:image' content='/og-image.jpg' />

        <title>Protege.dev | Remote Jobs for Junior Developers</title>
        <link rel='shortcut icon' href='/protege-logo.png'></link>
      </Head>

      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </>
  )
}

export default MyApp
