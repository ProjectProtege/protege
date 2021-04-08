import CompanyDashboardEmpty from 'assets/images/CompanyDashboardEmpty'
import getText from 'utils/i18n/Texts'
import AccountInteriorLayout from 'layouts/AccountInteriorLayout'

const CompanyDashboard = () => {
  const activeListings = null
  const archivedListings = null

  return (
    <AccountInteriorLayout className='mt-12'>
      <section className='relative col-span-4 mt-12 lg:mt-32'>
        <article className='mb-20 lg:mb-32'>
          <h2 className='mb-6 text-xl'>
            {getText('GLOBAL', 'ACTIVE_LISTINGS')}
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
            {activeListings ? (
              <tr>
                <td>Front-end Engineer (SaaS)</td>
                <td>32</td>
                <td>Mar. 1, 2020</td>
                <td>Active</td>
              </tr>
            ) : null}
          </table>

          {!activeListings ? (
            <div className='items-center w-full grid-cols-2 gap-10 mt-10 lg:grid'>
              <CompanyDashboardEmpty className='col-span-1 mb-12 lg:mb-0' />

              <div className='col-span-1'>
                <p className='mb-6'>
                  {getText('GLOBAL', 'EMPTY_COMPANY_DESC')}
                </p>
                <p>{getText('GLOBAL', 'EMPTY_COMPANY_DESC2')}</p>
              </div>
            </div>
          ) : (
            <div>Hello</div>
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
            {activeListings ? (
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
