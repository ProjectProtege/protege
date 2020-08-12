import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../../firebase/firebase'

import AdminHeaderNav from './AdminHeaderNav'

import Logo from '../../../assets/images/protegeLogo.svg'

const AdminHeader = () => {
  return (
    <header className='bg-gray-200 h-screen flex flex-col p-6 w-64 fixed'>
      <Link to='/admin' className='mb-12 w-3/4'>
        <img src={Logo} alt='Protege.dev Logo' />
      </Link>

      <AdminHeaderNav />

      <button
        onClick={() => auth.signOut()}
        className='bg-teal-500 w-full py-2 text-white text-xs uppercase'
      >
        Sign Out
      </button>
    </header>
  )
}

export default AdminHeader
