import { useState } from 'react'
import getText from 'utils/i18n/Texts'

import JobList from 'components/job/JobList'
import EmptyDashboard from 'components/user/EmptyDashboard'
import AccountInteriorLayout from 'layouts/AccountInteriorLayout'

const CandidateDashboard = () => {
  const [jobList, setJobList] = useState(true)

  return (
    <AccountInteriorLayout>
      <div className='relative col-span-4 mt-12 lg:mt-0'>
        <h1 className='mb-3 text-lg text-blue-900'>
          {getText('GLOBAL', 'ACTIVE_APPLICATIONS')}
        </h1>

        {jobList ? <JobList /> : <EmptyDashboard />}
      </div>
    </AccountInteriorLayout>
  )
}

export default CandidateDashboard
