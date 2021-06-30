/* eslint-disable react/prop-types */
import Head from 'next/head'
import GlobalLayout from 'layouts/GlobalLayout'
import 'assets/styles/globals.css'
import { useEffect } from 'react'
import { AuthProvider } from 'store/AuthContext'
import { Toaster } from 'react-hot-toast'
import { useJobs } from 'store/jobs_store'
import UserProfileProvider from 'store/UserProfileProvider'
import { db, analytics } from 'utils/db'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

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
          jobtitle: entry.jobtitle,
          jobDescription: entry.jobDescription,
          roleFocus: entry.roleFocus,
          status: entry.status,
          companyHQ: entry.companyHQ,
          companyName: entry.companyName,
          postedAt: entry.postedAt.toDate(),
          avatar: entry.avatar,
          companyDescription: entry.companyDescription,
          howToApply: entry.howToApply,
          companyWebsite: entry.companyWebsite,
          positionType: entry.positionType,
          paid: entry.paid,
          approved: entry.approved,
          dateApplied: 'March 1, 2021',
        }
      })
      setJobs(entriesData)
    } catch (err) {
      console.log('Oops! Something went wrong:', err.message)
    }
  }, [])

  return (
    <AuthProvider>
      <UserProfileProvider />
      <GlobalLayout>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta
            name='description'
            content='Remote job opportunities for junior developers'
          />
          <link rel='apple-touch-icon' href='/protege-logo.png' />

          <meta property='og:title' content='Protegé.dev' />
          <meta
            property='og:description'
            content='Remote Jobs for Junior Developers'
          />
          <meta
            property='og:image'
            content='https://protege.dev/og-image.png'
          />

          <meta name='twitter:card' content='summary_large_image' />
          <meta
            name='twitter:image'
            content='https://protege.dev/og-image.png'
          />
          <meta name='twitter:title' content='Protegé.dev' />
          <meta
            name='twitter:description'
            content='Remote Jobs for Junior Developers'
          />

          <title>Protegé.dev | Remote Jobs for Junior Developers</title>
          <link rel='shortcut icon' href='/protege-logo.png' />
        </Head>
        <Toaster
          containerClassName='toast'
          position='bottom-right'
          toastOptions={{
            className: 'toast',
            duration: 10000,
            success: {
              iconTheme: {
                primary: '#fff',
                secondary: '#5aa88e',
              },
              style: {
                background: '#5aa88e',
                color: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#fff',
                secondary: '#E53E3E',
              },
              style: {
                background: '#E53E3E',
                color: '#fff',
              },
            },
          }}
        />
        <Component {...pageProps} />
      </GlobalLayout>
    </AuthProvider>
  )
}

export default MyApp
