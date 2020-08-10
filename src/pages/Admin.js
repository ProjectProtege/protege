import React from 'react'
import { auth } from '../firebase/firebase'

const Admin = () => {
  return (
    <div className='mt-24'>
      <h1>Admin</h1>
      <button onClick={() => auth.signOut()} className='btn btn-teal'>
        Sign Out
      </button>
    </div>
  )
}

export default Admin
