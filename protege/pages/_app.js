/* eslint-disable react/prop-types */

import GlobalLayout from 'layouts/GlobalLayout'
import 'assets/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  )
}

export default MyApp
