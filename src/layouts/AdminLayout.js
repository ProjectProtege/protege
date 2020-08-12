import React from 'react'

import AdminHeader from '../components/admin/global/AdminHeader'
import AdminFooter from '../components/admin/global/AdminFooter'

const AdminLayout = ({ children }) => {
  return (
    <div className='flex'>
      <AdminHeader />

      <main class='flex-1 relative z-0 ml-64'>{children}</main>
    </div>
  )
}

export default AdminLayout
