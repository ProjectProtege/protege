import { useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useAuth } from 'store/AuthContext'

import ImageUploadIcon from 'assets/images/icons/image-upload-icon'
import CloseIcon from 'assets/images/icons/close-icon'

import getText from 'utils/i18n/Texts'
import { db } from 'utils/db'
import { useProfileInfo } from 'store/profile_info'
import shallow from 'zustand/shallow'

// Custom component imports
const SimpleFileUpload = dynamic(() => import('react-simple-file-upload'), {
  ssr: false,
})

const ProfileMenu = ({ children, profileUid, accountType }) => {
  const [logo, setLogo] = useState(null)
  const { signout } = useAuth()
  const [uploadImage, setUploadImage] = useState(false)
  const [profileInfo, setProfileInfo] = useProfileInfo((s) => [
    s.profileInfo,
    s.setProfileInfo,
  ])

  async function handleAvatarUpload(url) {
    await db
      .collection(accountType === 'candidate' ? 'candidates' : 'companies')
      .doc(profileUid)
      .update({
        avatar: url,
      })

    setProfileInfo({ ...profileInfo, avatar: url })
    setUploadImage(false)
  }

  const handleSignOut = async () => {
    try {
      await signout()
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <div className='relative flex flex-col order-2 p-6 space-y-4 bg-white rounded-md shadow-md md:order-1'>
      <div className='relative -ml-1'>
        {uploadImage ? (
          <div className='w-full'>
            <button
              className='w-4 h-4 absolute ml-2 mt-2'
              type='button'
              onClick={() => setUploadImage(false)}
            >
              <CloseIcon />
            </button>

            <SimpleFileUpload
              apiKey={process.env.SIMPLE_FILE_API_KEY}
              preview
              onSuccess={handleAvatarUpload}
              value={logo}
            />
          </div>
        ) : (
          <>
            <button
              className='absolute z-50 bottom-0 -mr-2 -mb-2 cursor-pointer'
              type='button'
              onClick={() => setUploadImage(true)}
            >
              <ImageUploadIcon className='h-12 w-12 ' tabIndex={0} />
            </button>
            <div className='relative w-32 h-32 overflow-hidden rounded-full'>
              {profileInfo?.avatar ? (
                <Image
                  src={profileInfo?.avatar}
                  layout='fill'
                  objectFit='cover'
                />
              ) : (
                <div className='text-gray-400'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-32 h-32 scale-110 transform'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <ul className='flex flex-col space-y-3 pt-4'>
        {children}
        <li>
          <button onClick={handleSignOut} type='button'>
            {getText('GLOBAL', 'SIGN_OUT')}
          </button>
        </li>
        <li className='text-red-500'>{getText('GLOBAL', 'DELETE_ACCOUNT')}</li>
      </ul>
    </div>
  )
}

ProfileMenu.propTypes = {
  children: PropTypes.node.isRequired,
  profileUid: PropTypes.string,
  accountType: PropTypes.string,
}

ProfileMenu.defaultProps = {
  profileUid: '',
  accountType: '',
}

export default ProfileMenu
