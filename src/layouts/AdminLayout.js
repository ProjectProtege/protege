import React from 'react'
import PropTypes from 'prop-types'

import AdminHeader from '../components/admin/global/AdminHeader'

const AdminLayout = ({ children }) => {
  return (
    <div className='flex overflow-x-hidden'>
      <AdminHeader />

      <main className='flex-1 relative z-0 ml-56'>{children}</main>
    </div>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AdminLayout
