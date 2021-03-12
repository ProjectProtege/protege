import NavLink from 'components/global/NavLink'
import { useAuth } from 'store/AuthContext'
import getText from 'utils/i18n/Texts'

const ProfileMenu = () => {
  const { currentUser } = useAuth();
    // if (currentUser) {
    const displayNameUrl = currentUser.displayName.split(" ").join('%20')
  // }

  const handleSignOut = async () => {
    try {
      await signout()
      router.push('/')
    } catch (error) {
      console.log('Sign Out Error:', error)
    }
  }

  return (
    <div className='flex flex-col space-y-4 order-2 md:order-1'>
      <div className='relative -ml-3' style={{ width: '106px' }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          width='106px'
          height='106px'
          className='text-gray-400'
        >
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
            clipRule='evenodd'
          />
        </svg>

        <div className='absolute bottom-0 flex items-center justify-center bg-teal-500 rounded-full right-3 w-7 h-7'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            width='18px'
            height='18px'
            className='absolute text-white'
          >
            <path
              fillRule='evenodd'
              d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>

      <ul className='flex flex-col space-y-3'>
        <li className='font-bold'>{currentUser.email}</li>
        <li>
          <NavLink href={`/candidate/${displayNameUrl}/index`} activeClassName="text-teal-500">
            {getText('ACCOUNT', 'VIEW_PROFILE')}
          </NavLink>
        </li>
        <li>
          <NavLink href={`/candidate/${displayNameUrl}/edit-profile`} className="font-bold" activeClassName="text-teal-500">
            {getText('ACCOUNT', 'EDIT_PROFILE')}
          </NavLink>
        </li>
        <li className='cursor-pointer' onClick={handleSignOut}>
          {getText('ACCOUNT', 'SIGN_OUT')}
        </li>
        <li className='text-red-500'>
          {getText('ACCOUNT', 'DELETE_ACCOUNT')}
        </li>
      </ul>
    </div>
  )
}

export default ProfileMenu