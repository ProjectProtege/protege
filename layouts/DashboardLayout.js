import PropTypes from 'prop-types'

import GlobalLayout from './GlobalLayout'
import DashboardBanner from 'assets/images/DashboardBanner'

const DashboardLayout = ({ children }) => {
  return (
    <GlobalLayout>
      <div className='mt-8'>
        <DashboardBanner />
        {children}
      </div>
    </GlobalLayout>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DashboardLayout
