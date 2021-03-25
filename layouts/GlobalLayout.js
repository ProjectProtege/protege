import PropTypes from 'prop-types'
import { useAuth } from 'store/AuthContext'
import { useUi } from 'store/ui_store'
import { useProfileInfo } from 'store/profile_info'
import { useRouter } from 'next/router'
import { auth, db } from '../utils/db/index'

import GlobalHeader from 'components/global/GlobalHeader'
import GlobalFooter from 'components/global/GlobalFooter'

import DashboardLayout from 'layouts/DashboardLayout'
import GeneralLayout from 'layouts/GeneralLayout'
import { useEffect } from 'react'

const GlobalLayout = ({ children }) => {
  const isNavOpen = useUi((s) => s.isNavOpen)
  const setProfileInfo = useProfileInfo((s) => s.setProfileInfo)
  const { currentUser } = useAuth()

  useEffect(async () => {
    if (currentUser !== null) {
      const userProfileInfo = await db
        .collection(
          currentUser.accountType === 'candidate' ? 'candidates' : 'companies'
        )
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          console.log(doc.data())
          const entry = doc.data()
          if (doc.exists) {
            switch (currentUser) {
              case 'company':
                return {
                  accountType: entry.accountType,
                  companyDescription: entry.companyDescription,
                  companyEmail: entry.companyEmail,
                  companyHQ: entry.companyHQ,
                  companyLogo: entry.companyLogo,
                  companyName: entry.companyName,
                  companyTimeframeFrom: entry.companyTimeframeFrom,
                  companyTimeframeTo: entry.companyTimeframeTo,
                  companyTimezone: entry.companyTimezone,
                  companyWebsite: entry.companyWebsite,
                  userUid: entry.userUid,
                }
                break
              case 'candidate':
                return {
                  accounttype: entry.accountType,
                  email: entry.email,
                  firstName: entry.firstName,
                  hideInfo: entry.hideInfo,
                  lastName: entry.lastName,
                  portfolio: entry.portfolio,
                  question1: entry.question1,
                  question2: entry.question2,
                  question3: entry.question3,
                  social_dev: entry.social_dev,
                  social_github: entry.social_github,
                  social_twitter: entry.social_twitter,
                  social_linkedin: entry.social_linkedin,
                  timeframe_from: entry.timeframe_from,
                  timeframe_to: entry.timeframe_to,
                  timezone: entry.timezone,
                  userUid: entry.userUid,
                }
            }
          }
        })
      setProfileInfo(userProfileInfo)
    }
  }, [currentUser])

  const location = useRouter().pathname

  return (
    <div className='flex flex-col flex-1 min-h-screen overflow-x-hidden text-blue-900 contianer'>
      <GlobalHeader />

      <div
        className={`fixed h-screen w-screen bg-blue-900 inset-0 z-40 pointer-events-none transition duration-150 ease-in-out ${
          isNavOpen ? 'opacity-50' : 'opacity-0'
        }`}
      />

      {location.includes('/company/') ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <GeneralLayout>{children}</GeneralLayout>
      )}

      {location.includes('/company/') ? null : <GlobalFooter />}
    </div>
  )
}

GlobalLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GlobalLayout
