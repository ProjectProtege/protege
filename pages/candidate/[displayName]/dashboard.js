import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import NavLink from 'components/global/NavLink'

import ProfileMenu from 'components/user/ProfileMenu'
import { useProfileInfo } from 'store/profile_info'
import getText from 'utils/i18n/Texts'

import JobList from 'components/job/JobList'
import EmptyDashboard from 'components/user/EmptyDashboard'

const CandidateDashboard = () => {
  const router = useRouter()
  const [jobList, setJobList] = useState(true)
  const profileInfo = useProfileInfo((s) => s.profileInfo)

  const displayName = router.query.displayName

  return (
    <div className='grid-cols-5 gap-10 mt-6 lg:grid'>
      <h1 className='sr-only'>Dashboard</h1>
      <aside className='col-span-1'>
        <ProfileMenu>
          <li className='font-bold'>{displayName}</li>
          <li>
            <NavLink
              href={`/candidate/${displayName}/`}
              activeClassName='text-teal-500'
            >
              {getText('ACCOUNT', 'VIEW_PROFILE')}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/candidate/${displayName}/edit-profile`}
              activeClassName='text-teal-500 font-bold'
            >
              {getText('ACCOUNT', 'EDIT_PROFILE')}
            </NavLink>
          </li>
        </ProfileMenu>
      </aside>

      <div className='relative col-span-4 mt-12 lg:mt-0'>
        <h1 className='mb-3 text-lg text-blue-900'>
          {getText('DASHBOARD', 'ACTIVE_APPLICATIONS')}
        </h1>

        {jobList ? <JobList /> : <EmptyDashboard />}
      </div>
    </div>
  )
}

export default CandidateDashboard
