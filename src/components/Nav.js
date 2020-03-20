import React from 'react'
import {Link} from 'react-router-dom'
import * as ROUTES from '../constants/routes'

const Nav = () => (
  <nav>
    <ul class="flex text-blue-500">
      <li className='pr-10 opacity-75 hover:opacity-100'>
        <Link to={ROUTES.PROJECT_BOARD}>Project Board</Link>
      </li>
      <li className='pr-10 opacity-75 hover:opacity-100'>
        <Link to={ROUTES.CONTRIBUTE}>Contribute</Link>
      </li>
      <li className='opacity-75 hover:opacity-100'>
        <Link to={ROUTES.CONTACT}>Contact</Link>
      </li>
    </ul>
  </nav>
)

export default Nav