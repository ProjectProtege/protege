import React from 'react'
import { NavLink } from 'react-router-dom'

import ListIcon from '../../../assets/images/svg/list-icon'
import AnalyticsIcon from '../../../assets/images/svg/analytics-icon'

const AdminHeaderNav = () => {
  return (
    <nav className='w-full mb-12'>
      <ul>
        <li className='bg-gray-100 px-6 py-2 rounded-md mb-3'>
          <NavLink
            to='/admin'
            className='text-xl text-blue-900 opacity-75 hover:opacity-100 transition ease-in-out duration-150 flex items-center'
            activeClassName='opacity-100'
          >
            <span className='w-4 h-4 mr-3 text-blue-300'>
              <ListIcon />
            </span>
            <span className='text-base pt-px font-medium'>Job Listings</span>
          </NavLink>
        </li>
        <li className='bg-gray-100 px-6 py-2 rounded mb-3'>
          <NavLink
            to='/analytics'
            className='text-xl text-blue-900 opacity-75 hover:opacity-100 transition ease-in-out duration-150 flex items-center'
            activeClassName='opacity-100'
          >
            <span className='w-4 h-4 mr-3 text-blue-300 font-medium'>
              <AnalyticsIcon />
            </span>
            <span className='text-base pt-px'>Analytics</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default AdminHeaderNav
