import { useState } from 'react'
import { useRouter } from 'next/router'

import ProfileMenu from 'components/user/ProfileMenu'
import getText from 'utils/i18n/Texts'

import JobList from 'components/job/JobList'
import EmptyDashboard from 'components/user/EmptyDashboard'

const CandidateDashboard = () => {
  const router = useRouter()
  const [jobList, setJobList] = useState(true)

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex flex-col justify-between space-y-6 md:space-x-12 md:space-y-0 md:flex-row'>
        <div className='flex flex-col order-2 mt-12 space-y-4 md:mt-0 md:order-1'>
          <ProfileMenu />
        </div>

        <div className='order-1 w-full md:order2'>
          <h1 className='mb-3 text-lg text-blue-900'>
            {getText('DASHBOARD', 'ACTIVE_APPLICATIONS')}
          </h1>

          {jobList ? <JobList /> : <EmptyDashboard />}
        </div>
      </div>
    </div>
  )
}

export default CandidateDashboard
