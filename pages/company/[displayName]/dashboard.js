import { useEffect } from 'react'
import getText from 'utils/i18n/Texts'

import { useProfileInfo } from 'store/profile_info'
import { db } from 'utils/db'
import { useAuth } from 'store/AuthContext'

import CompanyDashboardEmpty from 'assets/images/CompanyDashboardEmpty'
import AccountInteriorLayout from 'layouts/AccountInteriorLayout'
import JobItem from 'components/dashboard/JobItem'

const CompanyDashboard = () => {
  const postedJobs = useProfileInfo((s) => s.postedJobs)
  const archivedListings = null
  const setPostedJobs = useProfileInfo((s) => s.setPostedJobs)
  const { currentUser } = useAuth()

  useEffect(async () => {
    const userJobs = await db
      .collection('jobs')
      .where('userUid', '==', currentUser.userUid)
      .get()

    const userJobsData = userJobs.docs.map((documentSnapshot) => {
      const entry = documentSnapshot.data()
      const doc = documentSnapshot

      return {
        id: doc.id,
        jobtitle: entry.jobtitle,
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
        userUid: entry.userUid,
      }
    })

    if (userJobsData) {
      setPostedJobs(userJobsData)
    }
  })

  return (
    <AccountInteriorLayout className='mt-12'>
      <section className='relative col-span-4 mt-12 lg:mt-32'>
        <article className='mb-20 lg:mb-32'>
          <h2 className='mb-6 text-xl'>
            {getText('GLOBAL', 'ACTIVE_LISTINGS')}
          </h2>

          <div className='w-full'>
            <div className='grid grid-cols-12 mb-4 px-3'>
              <p className='text-sm font-light text-blue-400 uppercase text-left col-span-4'>
                {getText('GLOBAL', 'TITLE')}
              </p>
              <p className='text-sm font-light text-blue-400 uppercase text-left col-span-3'>
                {getText('GLOBAL', 'APPLICATIONS_RECEIVED')}
              </p>
              <p className='text-sm font-light text-blue-400 uppercase text-left col-span-2'>
                {getText('GLOBAL', 'DATE_POSTED')}
              </p>
              <p className='text-sm font-light text-blue-400 uppercase text-left col-span-1'>
                {getText('GLOBAL', 'STATUS')}
              </p>
              <p className='text-sm font-light text-right text-blue-400 uppercase col-span-2'>
                {getText('GLOBAL', 'ACTIONS')}
              </p>
            </div>
            <ul>
              {postedJobs &&
                postedJobs.map((job) => {
                  return <JobItem job={job} key={job.id} />
                })}
            </ul>
          </div>

          {!postedJobs?.length && (
            <div className='items-center w-full grid-cols-2 gap-10 mt-10 lg:grid'>
              <CompanyDashboardEmpty className='col-span-1 mb-12 lg:mb-0' />

              <div className='col-span-1'>
                <p className='mb-6'>
                  {getText('GLOBAL', 'EMPTY_COMPANY_DESC')}
                </p>
                <p>{getText('GLOBAL', 'EMPTY_COMPANY_DESC2')}</p>
              </div>
            </div>
          )}
        </article>

        <article>
          <h2 className='mb-6 text-xl'>
            {getText('GLOBAL', 'ARCHIVED_LISTINGS')}
          </h2>
          <table className='w-full'>
            <tr>
              <th className='text-sm font-light text-blue-400 uppercase'>
                {getText('GLOBAL', 'TITLE')}
              </th>
              <th className='text-sm font-light text-blue-400 uppercase'>
                {getText('GLOBAL', 'APPLICATIONS_RECEIVED')}
              </th>
              <th className='text-sm font-light text-blue-400 uppercase'>
                {getText('GLOBAL', 'DATE_POSTED')}
              </th>
              <th className='text-sm font-light text-right text-blue-400 uppercase'>
                {getText('GLOBAL', 'STATUS')}
              </th>
              <th className='text-sm font-light text-right text-blue-400 uppercase'>
                {getText('GLOBAL', 'ACTIONS')}
              </th>
            </tr>
            {archivedListings ? (
              <tr>
                <td>Front-end Engineer (SaaS)</td>
                <td>32</td>
                <td>Mar. 1, 2020</td>
                <td>Active</td>
              </tr>
            ) : null}
          </table>

          {!archivedListings ? (
            <div className='items-center w-full grid-cols-2 gap-10 mt-10 lg:grid'>
              <p>{getText('GLOBAL', 'EMPTY_ARCHIVE_DESC')}</p>
            </div>
          ) : (
            <div>Hello</div>
          )}
        </article>
      </section>
    </AccountInteriorLayout>
  )
}

export default CompanyDashboard
