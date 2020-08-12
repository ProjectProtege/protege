import React from 'react'
import { NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faChartLine } from '@fortawesome/free-solid-svg-icons'

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
            <FontAwesomeIcon className='mr-3' icon={faList} />
            <span className='text-base pt-px'>Job Listings</span>
          </NavLink>
        </li>
        <li className='bg-gray-100 px-6 py-2 rounded mb-3'>
          <NavLink
            to='/analytics'
            className='text-xl text-blue-900 opacity-75 hover:opacity-100 transition ease-in-out duration-150 flex items-center'
            activeClassName='opacity-100'
          >
            <FontAwesomeIcon className='mr-3' icon={faChartLine} />
            <span className='text-base pt-px'>Analytics</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default AdminHeaderNav
