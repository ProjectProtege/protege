import PropTypes from 'prop-types'
import GlobalLayout from './GlobalLayout'

const GeneralLayout = ({ children }) => {
  return (
    <GlobalLayout>
      <main
        className={`container flex-grow px-6 xl:px-0 ${
          location !== '/' ? 'mt-12' : ''
        }`}
      >
        {children}
      </main>
    </GlobalLayout>
  )
}

GeneralLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GeneralLayout
