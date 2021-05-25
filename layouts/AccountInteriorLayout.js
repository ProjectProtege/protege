import PropTypes from 'prop-types'
import { useAuth } from 'store/AuthContext'

import ProfileMenu from 'components/user/ProfileMenu'
import NavLink from 'components/global/NavLink'
import { useProfileInfo } from 'store/profile_info'

import getText from 'utils/i18n/Texts'
import Link from 'next/link'

const AccountInteriorLayout = ({ children, className }) => {
  const { currentUser } = useAuth()
  const profileInfo = useProfileInfo((s) => s.profileInfo)

  return (
    <>
      <div className={`container mx-auto ${className}`}>
        <div className='grid-cols-5 gap-10 lg:grid'>
          <aside className='col-span-1 mb-12 md:mb-0'>
            <ProfileMenu
              profileUid={currentUser?.userUid}
              accountType={currentUser?.accountType}
            >
              <li className='font-bold'>{profileInfo?.displayName}</li>
              <li>
                <NavLink
                  href={`/${profileInfo?.accountType}/${profileInfo?.slug}/dashboard`}
                  activeClassName='text-teal-700 opacity-100'
                  className='opacity-75 hover:opacity-100'
                >
                  {getText('GLOBAL', 'DASHBOARD')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  href={`/${profileInfo?.accountType}/${profileInfo?.slug}/`}
                  activeClassName='text-teal-700 opacity-100'
                  className='opacity-75 hover:opacity-100'
                >
                  {getText('GLOBAL', 'VIEW_PROFILE')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  href={`/${currentUser?.accountType}/${profileInfo?.slug}/edit-profile`}
                  activeClassName='text-teal-700 opacity-100'
                  className='opacity-75 hover:opacity-100'
                >
                  {getText('GLOBAL', 'EDIT_PROFILE')}
                </NavLink>
              </li>
            </ProfileMenu>

            {currentUser?.accountType === 'company' && (
              <Link href={`/company/${profileInfo?.slug}/post-a-job`}>
                <a className='btn btn-teal block text-center mt-6'>
                  Post a Job
                </a>
              </Link>
            )}
          </aside>

          <div className='col-span-4'>{children}</div>
        </div>
      </div>
    </>
  )
}

AccountInteriorLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

AccountInteriorLayout.defaultProps = {
  className: '',
}

export default AccountInteriorLayout
