import React, { useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { useRouter } from 'next/router'
import { useProfileInfo } from 'store/profile_info'

import { auth, db } from 'utils/db/index'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const setProfileInfo = useProfileInfo((s) => s.setProfileInfo)

  async function setUserProfileInfo(user) {
    const userProfileInfo = await db
      .collection(user.photoURL === 'candidate' ? 'candidates' : 'companies')
      .doc(user.uid)
      .get()

    setProfileInfo(userProfileInfo.data())
  }

  useEffect(async () => {
    const unsubscribe = await auth.onAuthStateChanged((user) => {
      if (user) {
        const userObject = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          accountType: user.photoURL,
        }

        setCurrentUser(userObject)
        setUserProfileInfo(user)
      }
      setIsLoading(false)
    })
    // onAuthStateChanged accepts a function as it's only arguement and returns the unsubscribe function below that will unsubscribe to function originally passed to onAuthStateChanged
    return unsubscribe
  }, [])

  async function updateUserProfile(data) {
    await auth.currentUser.updateProfile(data)

    setCurrentUser((oldVal) => {
      return {
        ...oldVal,
        accountType: data.photoURL,
        displayName: data.displayName,
      }
    })
  }

  const signup = async (name, email, password, accountType) => {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    )
    // const unknown = async (userCredential) => {
    if (userCredential) {
      await updateUserProfile({
        displayName: name,
        photoURL: accountType,
      })

      // Gets the uid for the users account object
      const { uid } = userCredential.user

      // Creates document in appropriate collection with matching uid
      await db
        .collection(accountType === 'candidate' ? 'candidates' : 'companies')
        .doc(uid)
        .set({
          userUid: uid,
          accountType,
        })
    }
    // })
    // .then(() => {
    router.push(`/${accountType}/${name}/edit-profile`)
    // })
  }

  async function signin(email, password) {
    const signin = await auth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        const { user } = data
        router.push(`/${user.photoURL}/${user.displayName}/dashboard`)
      })
    return signin
  }

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return auth.signInWithPopup(provider)
  }

  function signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return auth.signInWithPopup(provider)
  }

  function signInWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider()
    return auth.signInWithPopup(provider)
  }

  function signout() {
    return auth.signOut().then(() => {
      router.push('/').then(() => {
        setCurrentUser(null)
      })
    })
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
