import { useEffect } from 'react'
import { useAuth } from 'store/AuthContext'
import { db } from 'utils/db'
import { useProfileInfo } from 'store/profile_info'

// eslint-disable-next-line react/prop-types
const UserProfileProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const setProfileInfo = useProfileInfo((s) => s.setProfileInfo)
  const setPostedJobs = useProfileInfo((s) => s.setPostedJobs)

  useEffect(() => {
    async function fetchUserProfile() {
      const userProfileInfo = await db
        .collection(
          currentUser.accountType === 'candidate' ? 'candidates' : 'companies'
        )
        .doc(currentUser.userUid)
        .get()

      setProfileInfo(userProfileInfo.data())

      console.log(userProfileInfo.data())

      if (currentUser.accountType === 'company') {
        const postedJobs = await db
          .collection('jobs')
          .where('userUid', '==', currentUser.userUid)
          .get()

        const postedJobsData = postedJobs.docs.map((documentSnapshot) => {
          const entry = documentSnapshot.data()
          const doc = documentSnapshot

          return {
            id: doc.id,
            jobTitle: entry.jobtitle,
            jobDescription: entry.jobDescription,
            roleFocus: entry.roleFocus,
            status: entry.status,
            companyHQ: entry.companyHQ,
            companyName: entry.companyName,
            // postedAt: entry.postedAt.toDate(),
            companyLogo: entry.companyLogo,
            companyDescription: entry.companyDescription,
            companyWebsite: entry.companyWebsite,
            positionType: entry.positionType,
            paid: entry.paid,
            approved: entry.approved,
          }
        })

        if (postedJobsData) {
          setPostedJobs(postedJobsData)
        }
      }
    }

    if (currentUser) {
      fetchUserProfile()
    }
  }, [currentUser])

  return <>{children}</>
}

export default UserProfileProvider
