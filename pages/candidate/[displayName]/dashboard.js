import { useEffect, useState } from 'react'
import getText from 'utils/i18n/Texts'

import AccountInteriorLayout from 'layouts/AccountInteriorLayout'
import { db } from 'utils/db'
import { useAuth } from 'store/AuthContext'
import ApplicationItem from 'components/dashboard/ApplicationItem'
import CandidateDashboardEmpty from 'assets/images/CandidateDashboardEmpty'

const CandidateDashboard = () => {
  const { currentUser } = useAuth()
  const [appliedJobs, setAppliedJobs] = useState()

  useEffect(async () => {
    const applications = await db
      .collection('applications')
      .where('candidateId', '==', currentUser.userUid)
      .orderBy('applicationDate', 'desc')
      .get()

    const applicationData = applications.docs.map((documentSnapshot) => {
      const entry = documentSnapshot.data()
      const doc = documentSnapshot

      return {
        id: doc.id,
        candidateId: entry.candidateId,
        jobId: entry.jobId,
        viewed: entry.viewed,
        applicationDate: entry.applicationDate.toDate(),
      }
    })

    if (applicationData) {
      setAppliedJobs(applicationData)
    }
  }, [])

  return (
    <AccountInteriorLayout>
      <div className='relative col-span-4 mt-12 lg:mt-0'>
        <h1 className='mb-3 text-lg text-blue-900'>
          {getText('GLOBAL', 'ACTIVE_APPLICATIONS')}
        </h1>

        <section>
          <div className='w-full'>
            <div className='grid grid-cols-12 mb-4 px-3'>
              <p className='text-sm font-light text-blue-400 uppercase text-left col-span-4'>
                {getText('GLOBAL', 'TITLE')}
              </p>
              <p className='text-sm font-light text-blue-400 uppercase text-left col-span-3'>
                {getText('GLOBAL', 'COMPANY')}
              </p>
              <p className='text-sm font-light text-blue-400 uppercase text-left col-span-2'>
                {getText('GLOBAL', 'DATE_APPLIED')}
              </p>
              <p className='text-sm font-light text-blue-400 uppercase text-left col-span-1'>
                {getText('GLOBAL', 'STATUS')}
              </p>
              <p className='text-sm font-light text-right text-blue-400 uppercase col-span-1'>
                {' '}
              </p>
            </div>
            <ul>
              {appliedJobs &&
                appliedJobs.map((job, index) => {
                  return <ApplicationItem job={job} key={index} />
                })}
            </ul>
          </div>

          {!appliedJobs?.length && (
            <div className='w-full grid-cols-2 gap-10 mt-10 lg:grid'>
              <CandidateDashboardEmpty className='col-span-1 mb-12 lg:mb-0' />

              <div className='col-span-1 lg:w-3/4 lg:mt-16'>
                <p className='mb-6'>
                  {getText('GLOBAL', 'EMPTY_CANDIDATE_DESC')}
                </p>
                <p>{getText('GLOBAL', 'EMPTY_CANDIDATE_DESC2')}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </AccountInteriorLayout>
  )
}

export default CandidateDashboard
