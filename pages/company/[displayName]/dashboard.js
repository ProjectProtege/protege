import { useEffect, useState } from 'react'
import getText from 'utils/i18n/Texts'

import { useProfileInfo } from 'store/profile_info'
import { db } from 'utils/db'
import { useAuth } from 'store/AuthContext'

import nookies from 'nookies'
import { verifyIdToken } from 'utils/db/firebaseAdmin'

import CompanyDashboardEmpty from 'assets/images/CompanyDashboardEmpty'
import AccountInteriorLayout from 'layouts/AccountInteriorLayout'
import JobItem from 'components/dashboard/JobItem'

// eslint-disable-next-line consistent-return
const CompanyDashboard = ({ session }) => {
  const postedJobs = useProfileInfo((s) => s.postedJobs)
  const setPostedJobs = useProfileInfo((s) => s.setPostedJobs)
  const { currentUser } = useAuth()
  const [archivedJobs, setArchivedJobs] = useState([])
  const [activeJobs, setActiveJobs] = useState([])

  function filterActiveJobs(jobList) {
    const active = jobList.filter((job) => {
      return (
        job.status !== 'inactive' && job.paid === true && job.approved === true
      )
    })

    setActiveJobs(active)
  }

  function filterArchivedJobs(jobList) {
    const archived = jobList.filter((job) => {
      return (
        job.status === 'inactive' && job.paid === true && job.approved === true
      )
    })

    setArchivedJobs(archived)
  }

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
        postedAt: entry.postedAt.toDate(),
        avatar: entry.avatar,
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
      filterActiveJobs(userJobsData)
      filterArchivedJobs(userJobsData)
    }
  }, [])

  if (session) {
    return (
      <AccountInteriorLayout className='mt-12'>
        <section className='relative col-span-4 mt-12 lg:mt-32'>
          <article className='mb-20 lg:mb-32'>
            <h2 className='mb-6 text-xl'>
              {getText('GLOBAL', 'ACTIVE_LISTINGS')}
            </h2>

            <div className='w-full'>
              <div className='grid grid-cols-12 mb-4 px-3 gap-6'>
                <p className='text-sm font-light text-blue-400 uppercase text-left col-span-8 md:col-span-5'>
                  {getText('GLOBAL', 'TITLE')}
                </p>
                <p className='text-sm font-light text-blue-400 uppercase text-left col-span-4 md:col-span-2'>
                  {getText('GLOBAL', 'APPLICANTS')}
                </p>
                <p className='hidden md:block text-sm font-light text-blue-400 uppercase text-left col-span-2'>
                  {getText('GLOBAL', 'DATE_POSTED')}
                </p>
                <p className='hidden md:block text-sm font-light text-blue-400 uppercase text-left col-span-1'>
                  {getText('GLOBAL', 'STATUS')}
                </p>
                <p className='hidden md:block text-sm font-light text-right text-blue-400 uppercase col-span-2'>
                  {getText('GLOBAL', 'ACTIONS')}
                </p>
              </div>
              <ul>
                {activeJobs &&
                  activeJobs.map((job) => {
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
            <div className='w-full'>
              <div className='grid grid-cols-12 mb-4 px-3 gap-6'>
                <p className='text-sm font-light text-blue-400 uppercase text-left col-span-8 md:col-span-5'>
                  {getText('GLOBAL', 'TITLE')}
                </p>
                <p className='text-sm font-light text-blue-400 uppercase text-left col-span-4 md:col-span-2'>
                  {getText('GLOBAL', 'APPLICANTS')}
                </p>
                <p className='hidden md:block text-sm font-light text-blue-400 uppercase text-left col-span-2'>
                  {getText('GLOBAL', 'DATE_POSTED')}
                </p>
                <p className='hidden md:block text-sm font-light text-blue-400 uppercase text-left col-span-1'>
                  {getText('GLOBAL', 'STATUS')}
                </p>
                <p className='hidden md:block text-sm font-light text-right text-blue-400 uppercase col-span-2'>
                  {getText('GLOBAL', 'ACTIONS')}
                </p>
              </div>
              <ul>
                {archivedJobs &&
                  archivedJobs.map((job) => {
                    return <JobItem job={job} key={job.id} />
                  })}
              </ul>
            </div>

            {!archivedJobs && (
              <div className='items-center w-full grid-cols-2 gap-10 mt-10 lg:grid'>
                <p>{getText('GLOBAL', 'EMPTY_ARCHIVE_DESC')}</p>
              </div>
            )}
          </article>
        </section>
      </AccountInteriorLayout>
    )
  }
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)

    return {
      props: {
        session: { ...token },
      },
    }
  } catch (err) {
    context.res.writeHead(302, { location: '/sign-in' })
    context.res.end()
    return { props: [] }
  }
}

export default CompanyDashboard
