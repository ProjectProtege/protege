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
  const requiredCompanyProfileFields = useProfileInfo(
    (s) => s.requiredCompanyProfileFields
  )

  const companyProfileComplete = () => {
    if (profileInfo) {
      return (
        requiredCompanyProfileFields.filter((field) => {
          return !profileInfo[field]
        }).length === 0
      )
    }
    return false
  }

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
                  className={`opacity-75 hover:opacity-100 ${
                    !companyProfileComplete()
                      ? 'pointer-events-none opacity-25'
                      : ''
                  }`}
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
              <div className='text-center space-y-2'>
                <Link href={`/company/${profileInfo?.slug}/post-a-job`}>
                  <a
                    className={`btn btn-teal block text-center mt-6 ${
                      !companyProfileComplete() ? 'btn-disabled' : ''
                    }`}
                  >
                    Post a Job
                  </a>
                </Link>
                <p className='opacity-75 text-xs'>
                  {!companyProfileComplete()
                    ? getText('GLOBAL', 'FILL_OUT')
                    : ''}
                </p>
              </div>
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
