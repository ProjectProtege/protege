import PropTypes from 'prop-types'

import DashboardBanner from 'assets/images/DashboardBanner'

const DashboardLayout = ({ children }) => {
  return (
    <div className='relative pb-24 mt-8 bg-gray-100'>
      <DashboardBanner />
      <div className='max-w-4xl px-6 mx-auto lg:px-0'>{children}</div>
    </div>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DashboardLayout
