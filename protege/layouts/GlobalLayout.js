import PropTypes from 'prop-types'
import { useUi } from 'store/ui_store'
import { useRouter } from 'next/router'

import GlobalHeader from 'components/global/GlobalHeader'
import GlobalFooter from 'components/global/GlobalFooter'

const GlobalLayout = ({ children }) => {
  const isNavOpen = useUi((s) => s.isNavOpen)

  const location = useRouter().pathname

  return (
    <div className='flex flex-col flex-1 min-h-screen overflow-x-hidden'>
      <GlobalHeader />

      <div
        className={`fixed h-screen w-screen bg-blue-900 inset-0 z-40 pointer-events-none transition duration-150 ease-in-out ${
          isNavOpen ? 'opacity-50' : 'opacity-0'
        }`}
      />

      <main
        className={`container flex-grow px-6 xl:px-0 ${
          location !== '/' ? 'mt-12' : ''
        }`}
      >
        {children}
      </main>

      <GlobalFooter />
    </div>
  )
}

GlobalLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
}

export default GlobalLayout
