import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { auth } from './firebase'
import LoadingSpinner from '../components/LoadingSpinner'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    })
  }, [])

  if (pending) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
