import PropTypes from 'prop-types'

import DashboardBanner from 'assets/images/DashboardBanner'

const DashboardLayout = ({ children }) => {
  return (
    <div className='relative flex-grow pb-24 mt-4 bg-gray-100'>
      <DashboardBanner />
      <div className='max-w-6xl px-6 mx-auto xl:px-0'>{children}</div>
    </div>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DashboardLayout
