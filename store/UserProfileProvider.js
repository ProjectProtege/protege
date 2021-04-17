import { useEffect } from 'react'
import { useAuth } from 'store/AuthContext'
import { db } from 'utils/db'
import { useProfileInfo } from 'store/profile_info'

// eslint-disable-next-line react/prop-types
const UserProfileProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const setProfileInfo = useProfileInfo((s) => s.setProfileInfo)

  useEffect(() => {
    async function fetchUserProfile() {
      const userProfileInfo = await db
        .collection(
          currentUser.accountType === 'candidate' ? 'candidates' : 'companies'
        )
        .doc(currentUser.userUid)
        .get()

      setProfileInfo(userProfileInfo.data())
    }

    if (currentUser) {
      fetchUserProfile()
    }
  }, [currentUser])

  return <>{children}</>
}

export default UserProfileProvider
