import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useAuth } from 'store/AuthContext'

import ProfileMenu from 'components/user/ProfileMenu'
import NavLink from 'components/global/NavLink'

import getText from 'utils/i18n/Texts'

const AccountInteriorLayout = ({ children, className }) => {
  const router = useRouter()
  const { currentUser } = useAuth()

  const { displayName } = router.query

  return (
    <>
      <div className={`container mx-auto ${className}`}>
        <div className='grid-cols-5 gap-10 lg:grid'>
          <aside className='col-span-1 mb-12 md:mb-0'>
            <ProfileMenu
              profileUid={currentUser.userUid}
              accountType={currentUser.accountType}
            >
              <li className='font-bold'>{displayName}</li>
              <li>
                <NavLink
                  href={`/${currentUser.accountType}/${displayName}/dashboard`}
                  activeClassName='text-teal-700 opacity-100'
                  className='opacity-75 hover:opacity-100'
                >
                  {getText('GLOBAL', 'DASHBOARD')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  href={`/${currentUser.accountType}/${displayName}/`}
                  activeClassName='text-teal-700 opacity-100'
                  className='opacity-75 hover:opacity-100'
                >
                  {getText('GLOBAL', 'VIEW_PROFILE')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  href={`/${currentUser.accountType}/${displayName}/edit-profile`}
                  activeClassName='text-teal-700 opacity-100'
                  className='opacity-75 hover:opacity-100'
                >
                  {getText('GLOBAL', 'EDIT_PROFILE')}
                </NavLink>
              </li>
            </ProfileMenu>
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
