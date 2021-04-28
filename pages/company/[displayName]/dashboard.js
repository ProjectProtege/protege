import { useRouter } from 'next/router'
import CompanyDashboardEmpty from 'assets/images/CompanyDashboardEmpty'
import getText from 'utils/i18n/Texts'
import AccountInteriorLayout from 'layouts/AccountInteriorLayout'
import { useProfileInfo } from 'store/profile_info'
import Trash from 'assets/images/icons/trash'
import Edit from 'assets/images/icons/edit'
import Link from 'next/link'

const CompanyDashboard = () => {
  const router = useRouter()
  const postedJobs = useProfileInfo((s) => s.postedJobs)
  const archivedListings = null

  const { displayName } = router.query

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
                  return (
                    <li className='grid items-center mb-4 p-3 text-sm bg-white border-l-4 border-teal-500 rounded shadow grid-cols-12'>
                      <p className='col-span-4 font-bold'>
                        <a href='#'>{job.jobTitle}</a>
                      </p>
                      <p className='col-span-3 opacity-75'>32</p>
                      <p className='col-span-2 opacity-75'>March 21, 2021</p>
                      <p
                        className={`col-span-1 capitalize ${
                          job.status === 'active'
                            ? 'text-green-600'
                            : 'text-error-full'
                        }`}
                      >
                        {job.status}
                      </p>
                      <p className='col-span-2 flex items-center justify-end'>
                        <Link href={`/company/${displayName}/${job.id}/edit`}>
                          <a className='opacity-50 hover:opacity-100 mr-6'>
                            <Edit />
                          </a>
                        </Link>
                        <button
                          className='opacity-50 hover:opacity-100 text-error-full'
                          type='button'
                        >
                          <Trash />
                        </button>
                      </p>
                    </li>
                  )
                })}
            </ul>
          </div>

          {/* {!postedJobs.length && (
            <div className='items-center w-full grid-cols-2 gap-10 mt-10 lg:grid'>
              <CompanyDashboardEmpty className='col-span-1 mb-12 lg:mb-0' />

              <div className='col-span-1'>
                <p className='mb-6'>
                  {getText('GLOBAL', 'EMPTY_COMPANY_DESC')}
                </p>
                <p>{getText('GLOBAL', 'EMPTY_COMPANY_DESC2')}</p>
              </div>
            </div>
          )} */}
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
