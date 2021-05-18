import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const GeneralLayout = ({ children }) => {
  const { pathname } = useRouter()

  return (
    <main
      className={`container flex-grow px-6 xl:px-0 ${
        pathname !== '/' ? 'mt-12' : ''
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
