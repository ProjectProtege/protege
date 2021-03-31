import PropTypes from 'prop-types'
import DashboardBanner from 'assets/images/DashboardBanner'

const DashboardLayout = ({ children, hasBanner }) => {
  return (
    <div className='relative flex-grow pb-24 mt-4 bg-gray-100'>
      {hasBanner && <DashboardBanner />}
      <div className='container px-6 mx-auto xl:px-0'>{children}</div>
    </div>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  hasBanner: PropTypes.boolean,
}

DashboardLayout.defaultProps = {
  hasBanner: false,
}

export default DashboardLayout
