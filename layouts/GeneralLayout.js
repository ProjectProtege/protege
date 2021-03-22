import PropTypes from 'prop-types'

const GeneralLayout = ({ children }) => {
  return (
    <main
      className={`container flex-grow px-6 xl:px-0 ${
        location !== '/' ? 'mt-12' : ''
      }`}
    >
      {children}
    </main>
  )
}

GeneralLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GeneralLayout
