import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useProfileInfo } from 'store/profile_info'
import nookies from 'nookies'

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

  function slugify(name) {
    return name.replace(' ', '-').toLowerCase()
  }

  async function fetchUserInfo(user) {
    const userProfileInfo = await db
      .collection(user.accountType === 'candidate' ? 'candidates' : 'companies')
      .doc(user.userUid)
      .get()

    setProfileInfo(userProfileInfo.data())
  }

  useEffect(async () => {
    const unsubscribe = await auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setCurrentUser(null)
        nookies.destroy(undefined, 'token', { path: '/' })
      }
      if (user) {
        const userObject = {
          userUid: user.uid,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          accountType: user.photoURL,
        }
        const token = await user.getIdToken()
        // fetchUserInfo(userObject)
        setCurrentUser(userObject)
        nookies.set(undefined, 'token', token, { path: '/' })
      }
      setIsLoading(false)
    })
    // onAuthStateChanged accepts a function as it's only arguement and returns the unsubscribe function below that will unsubscribe to function originally passed to onAuthStateChanged
    return unsubscribe
  }, [])

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)

    // clean up setInterval
    return () => clearInterval(handle)
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

    if (userCredential) {
      await updateUserProfile({
        displayName: name,
        photoURL: accountType,
      })

      // Gets the userUid for the users account object
      const { uid } = userCredential.user

      // Creates document in appropriate collection with matching uid
      await db
        .collection(accountType === 'candidate' ? 'candidates' : 'companies')
        .doc(uid)
        .set({
          displayName: name,
          userUid: uid,
          slug: slugify(name),
          accountType,
          email,
          projects: [],
          tech: [],
        })

      await fetchUserInfo({
        userUid: uid,
        accountType,
      })

      router.push(`/${accountType}/${slugify(name)}/edit-profile`)
    }
  }

  async function signin(email, password) {
    const rawUser = await auth.signInWithEmailAndPassword(email, password)

    const { user } = rawUser
    const slug = user.displayName.replace(' ', '-').toLowerCase()

    const userObject = {
      userUid: user.uid,
      accountType: user.photoURL,
    }

    await fetchUserInfo(userObject)

    router.push(`/${user.photoURL}/${slug}/dashboard`)

    return rawUser
  }

  function signout() {
    return auth.signOut().then(() => {
      router.push('/').then(() => {
        setCurrentUser(null)
        setProfileInfo(null)
      })
    })
  }

  function resendVerificationEmail() {
    return auth.currentUser.sendEmailVerification()
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
    signout,
    resetPassword,
    updateEmail,
    updatePassword,
    resendVerificationEmail,
  }

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}
