import React, { useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { auth } from '../utils/db/index'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // console.log(user);
      setCurrentUser(user)
      setIsLoading(false)
    })
    // onAuthStateChanged accepts a function as it's only arguement and returns the unsubscribe function below that will unsubscribe to function originally passed to onAuthStateChanged
    return unsubscribe
  }, [])

  const signup = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
    } catch (error) {
      console.log('AuthContext Error:', error)
    }
  }

  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return auth
      .signInWithPopup(provider)
      .then(() => {
        console.log('Signed in with Google')
      })
      .catch(function (error) {
        console.log('Error Signing in with Google')
      })
  }

  function signInWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider()
    return auth
      .signInWithPopup(provider)
      .then(() => {
        console.log('Signed in with Facebook')
      })
      .catch(function (error) {
        console.log('Error Signing in with Facebook')
      })
  }

  function signout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  const value = {
    currentUser,
    signup,
    signin,
    signInWithGoogle,
    signInWithFacebook,
    signout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}
