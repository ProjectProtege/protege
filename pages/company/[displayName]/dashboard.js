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

  const handleSignOut = async () => {
    try {
      await signout()
      router.push('/')
    } catch (error) {
      console.log('Sign Out Error:', error)
    }
  }

  const deleteAccount = () => {
    console.log('delete')
  }

  return (
    <div className='grid-cols-5 gap-10 mt-6 md:grid md:mt-12'>
      <h1 className='sr-only'>Dashboard</h1>
      <aside className='col-span-1'>
        <ProfileMenu avatar={profileInfo.companyLogo}>
          {' '}
          <li className='text-lg font-bold'>{profileInfo.companyName}</li>
          <li>
            <NavLink
              href={`/company/${displayNameUrl}/index`}
              activeClassName='text-teal-700 opacity-100'
              className='opacity-75 hover:opacity-100'
            >
              {getText('ACCOUNT', 'VIEW_PROFILE')}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/company/${displayNameUrl}/edit-profile`}
              activeClassName='text-teal-700 opacity-100'
              className='opacity-75 hover:opacity-100'
            >
              {getText('ACCOUNT', 'EDIT_PROFILE')}
            </NavLink>
          </li>
        </ProfileMenu>
      </aside>

      <section className='relative col-span-4 mt-12 md:mt-32'>
        <article className='mb-20 md:mb-32'>
          <h2 className='mb-6 text-xl'>Active Listings</h2>
          <table className='w-full'>
            <tr>
              <th className='text-sm font-light text-blue-400 uppercase'>
                Title
              </th>
              <th className='text-sm font-light text-blue-400 uppercase'>
                Applications Received
              </th>
              <th className='text-sm font-light text-blue-400 uppercase'>
                Date Posted
              </th>
              <th className='text-sm font-light text-right text-blue-400 uppercase'>
                Status
              </th>
              <th className='text-sm font-light text-right text-blue-400 uppercase'>
                Actions
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
            <div className='items-center w-full grid-cols-2 gap-10 mt-10 md:grid'>
              <CompanyDashboardEmpty className='col-span-1 mb-12 md:mb-0' />

              <div className='col-span-1'>
                <p className='mb-6'>
                  Your active listings will show up here so you can easily track
                  them!
                </p>
                <p>It's looking kind of empty.. get some listings up!</p>
              </div>
            </div>
          ) : (
            <div>Hello</div>
          )}
        </article>

        <article>
          <h2 className='mb-6 text-xl'>Archived Listings</h2>
          <table className='w-full'>
            <tr>
              <th className='text-sm font-light text-blue-400 uppercase'>
                Title
              </th>
              <th className='text-sm font-light text-blue-400 uppercase'>
                Applications Received
              </th>
              <th className='text-sm font-light text-blue-400 uppercase'>
                Date Posted
              </th>
              <th className='text-sm font-light text-right text-blue-400 uppercase'>
                Status
              </th>
              <th className='text-sm font-light text-right text-blue-400 uppercase'>
                Actions
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
            <div className='items-center w-full grid-cols-2 gap-10 mt-10 md:grid'>
              <p>Your archived listings will show up here.</p>
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
