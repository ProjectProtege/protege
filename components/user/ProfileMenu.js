import PropTypes from 'prop-types'
import Image from 'next/image'

const ProfileMenu = ({ avatar, children }) => {
  return (
    <div className='relative flex flex-col order-2 p-6 space-y-4 bg-white rounded-md shadow-md md:order-1'>
      <div className='relative -ml-1' style={{ width: '106px' }}>
        {avatar !== null ? (
          <div className='relative w-24 h-24 overflow-hidden rounded-full'>
            <Image src={avatar} layout='fill' objectFit='contain' />
          </div>
        ) : (
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
        )}

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

      <ul className='flex flex-col space-y-3'>{children}</ul>
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
