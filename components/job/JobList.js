import { useEffect, useState } from 'react'
import { useProfileInfo } from 'store/profile_info'
import { db } from 'utils/db'
import getText from 'utils/i18n/Texts'

const JobList = () => {
  const profileInfo = useProfileInfo((s) => s.profileInfo)
  const [activeApplications, setActiveApplications] = useState()

  useEffect(() => {
    // TODO: What should happen with this fn? It's not being used anywhere.
    // eslint-disable-next-line no-unused-vars
    async function fetchApplications() {
      const applications = await db
        .collection('applications')
        .where('candidateId', '==', profileInfo.userUid)
        .get()

      const applicationData = applications.docs.map((documentSnapshot) => {
        const entry = documentSnapshot.data()
        const doc = documentSnapshot

        return {
          id: doc.id,
          candidateId: entry.candidateId,
          jobId: entry.jobId,
        }
      })
      setActiveApplications(applicationData)
    }
  })

  return (
    <section>
      <article className='mb-20 lg:mb-32'>
        <h2 className='mb-6 text-xl'>{getText('GLOBAL', 'ACTIVE_LISTINGS')}</h2>

        <div className='w-full'>
          <div className='grid grid-cols-12 mb-4 px-3'>
            <p className='text-sm font-light text-blue-400 uppercase text-left col-span-4'>
              {getText('GLOBAL', 'TITLE')}
            </p>
            <p className='text-sm font-light text-blue-400 uppercase text-left col-span-3'>
              {getText('GLOBAL', 'APPLICANTS')}
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
            {activeApplications &&
              activeApplications.map((job) => {
                // TODO: ?
                return <JobItem job={job} key={job.id} />
              })}
          </ul>
        </div>

        {!activeApplications?.length && (
          <div className='items-center w-full grid-cols-2 gap-10 mt-10 lg:grid'>
            <CompanyDashboardEmpty className='col-span-1 mb-12 lg:mb-0' />

            <div className='col-span-1'>
              <p className='mb-6'>{getText('GLOBAL', 'EMPTY_COMPANY_DESC')}</p>
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
              {getText('GLOBAL', 'APPLICANTS')}
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
          {/* TODO: ? */}
          {archivedListings ? (
            <tr>
              <td>Front-end Engineer (SaaS)</td>
              <td>32</td>
              <td>Mar. 1, 2020</td>
              <td>Active</td>
            </tr>
          ) : null}
        </table>

        {/* TODO: ? */}
        {!archivedListings ? (
          <div className='items-center w-full grid-cols-2 gap-10 mt-10 lg:grid'>
            <p>{getText('GLOBAL', 'EMPTY_ARCHIVE_DESC')}</p>
          </div>
        ) : (
          <div>Hello</div>
        )}
      </article>
    </section>
  )
}

export default JobList
