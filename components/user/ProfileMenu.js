import { useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import getText from 'utils/i18n/Texts'
import { useAuth } from 'store/AuthContext'

import dynamic from 'next/dynamic'

// Custom component imports
const SimpleFileUpload = dynamic(() => import('react-simple-file-upload'), {
  ssr: false,
})

const ProfileMenu = ({ avatar, children }) => {
  const [logo, setLogo] = useState(null)
  const { signout } = useAuth()

  function handleLogoUpload(url) {
    setLogo(url)
  }

  const handleSignOut = async () => {
    try {
      console.log('click')
      await signout()
    } catch (error) {
      console.log('Sign Out Error:', error)
    }
  }

  return (
    <div className='relative flex flex-col order-2 p-6 space-y-4 bg-white rounded-md shadow-md md:order-1'>
      <div className='relative -ml-1' style={{ width: '106px' }}>
        {logo === null ? (
          <SimpleFileUpload
            apiKey={process.env.SIMPLE_FILE_API_KEY}
            preview={true}
            onSuccess={handleLogoUpload}
            value={logo}
          />
        ) : (
          <div className='relative w-24 h-24 overflow-hidden rounded-full'>
            {/* <Image src={avatar} layout='fill' objectFit='contain' /> */}
          </div>
        )}
      </div>

      <ul className='flex flex-col space-y-3'>
        {children}
        <li>
          <button onClick={handleSignOut}>
            {getText('GLOBAL', 'SIGN_OUT')}
          </button>
        </li>
        <li className='text-red-500'>{getText('GLOBAL', 'DELETE_ACCOUNT')}</li>
      </ul>
    </div>
  )
}

ProfileMenu.proptypes = {
  avatar: PropTypes.string,
}

ProfileMenu.defaultProps = {
  avatar: null,
}

export default ProfileMenu
