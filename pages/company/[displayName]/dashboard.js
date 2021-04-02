import ProfileMenu from 'components/user/ProfileMenu'
import { useRouter } from 'next/router'
import CompanyDashboardEmpty from 'assets/images/CompanyDashboardEmpty'
import { useProfileInfo } from 'store/profile_info'
import NavLink from 'components/global/NavLink'
import { useAuth } from 'store/AuthContext'
import getText from 'utils/i18n/Texts'

const CompanyDashboard = () => {
  const { currentUser } = useAuth()
  const router = useRouter()
  const activeListings = null
  const archivedListings = null
  const profileInfo = useProfileInfo((s) => s.profileInfo)

  const displayNameUrl = router.query.displayName
  const avatarImg = profileInfo?.companyLogo

  return (
    <div className='grid-cols-5 gap-10 mt-6 lg:grid lg:mt-12'>
      <h1 className='sr-only'>{getText('GLOBAL', 'DASHBOARD')}</h1>
      <aside className='col-span-1'>
        <ProfileMenu avatar={avatarImg}>
          <li className='text-lg font-bold'>{profileInfo?.companyName}</li>
          <li>
            <NavLink
              href={`/company/${displayNameUrl}/index`}
              activeClassName='text-teal-700 opacity-100'
              className='opacity-75 hover:opacity-100'
            >
              {getText('GLOBAL', 'VIEW_PROFILE')}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/company/${displayNameUrl}/edit-profile`}
              activeClassName='text-teal-700 opacity-100'
              className='opacity-75 hover:opacity-100'
            >
              {getText('GLOBAL', 'EDIT_PROFILE')}
            </NavLink>
          </li>
        </ProfileMenu>
      </aside>

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
    </div>
  )
}

export default CompanyDashboard
