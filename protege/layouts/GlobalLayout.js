import PropTypes from 'prop-types'
import GlobalHeader from 'components/global/GlobalHeader'
import GlobalFooter from 'components/global/GlobalFooter'

const GlobalLayout = ({ children }) => {
  return (
    <div className='flex flex-col flex-1 min-h-screen overflow-x-hidden'>
      <GlobalHeader />

      <main className='container flex-grow px-6 xl:px-0'>{children}</main>

      <GlobalFooter />
    </div>
  )
}

GlobalLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
}

export default GlobalLayout
