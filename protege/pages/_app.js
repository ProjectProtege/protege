/* eslint-disable react/prop-types */

import GlobalLayout from 'layouts/GlobalLayout'
import 'assets/styles/globals.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useJobs } from 'store/jobs_store'

function MyApp({ Component, pageProps }) {
  const setJobs = useJobs((s) => s.setJobs)

  useEffect(async () => {
    const res = await axios.get('/api/entries')
    setJobs(res.data.entriesData)
  }, [])

  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  )
}

export default MyApp
