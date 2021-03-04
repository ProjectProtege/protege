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
    await auth.createUserWithEmailAndPassword(email, password)
  }

  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return auth.signInWithPopup(provider)
  }

  function signInWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider()
    return auth.signInWithPopup(provider)
  }

  function signInWithGithub() {
    var provider = new firebase.auth.GithubAuthProvider()
    return auth.signInWithPopup(provider)
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
    signInWithGithub,
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
