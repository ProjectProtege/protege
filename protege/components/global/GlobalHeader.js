import { useState } from 'react'
import Link from 'next/link'
import NavLink from 'components/global/NavLink'
import MenuIcon from 'components/global/MenuIcon'
import CloseIcon from 'components/global/CloseIcon'
import Logo from 'components/global/ProtegeLogo'

const GlobalHeader = () => {
  const [active, setActive] = useState(false)

  return (
    <header className='relative container flex justify-between items-center py-6 px-6 xl:px-0 z-50'>
      <Link href='/' className='w-1/4 lg:w-1/6 h-auto'>
        <a>
          <span>
            <Logo className='w-full' />
          </span>
        </a>
      </Link>

      <button
        className='absolute right-0  mr-4 lg:hidden h-12 w-12 text-blue-900  p-2'
        aria-label='navigation'
        onClick={() => setActive((oldActive) => !oldActive)}
        type='button'
      >
        <MenuIcon />
      </button>

      <nav
        data-cy='mobile-nav'
        className={`${
          active ? 'translate-0' : 'translate-x-full'
        } lg:hidden absolute w-screen max-w-md top-0 right-0 flex flex-row transform transition duration-150 ease-in-out`}
      >
        <button
          className='lg:hidden h-12 w-12 text-blue-900 bg-white rounded-full p-1 shadow-md ml-2 mt-8'
          aria-label='navigation'
          onClick={() => setActive((oldActive) => !oldActive)}
          type='button'
        >
          <CloseIcon />
        </button>

        <ul className='bg-white w-full h-screen shadow-xl ml-2'>
          <li className='py-4 px-6 border-b border-gray-300'>
            <NavLink
              href='/'
              className='hover:opacity-100 opacity-75 '
              activeClassName='opacity-100'
            >
              Home
            </NavLink>
          </li>
          <li className='py-4 px-6 border-b border-gray-300'>
            <NavLink
              href='/job-board'
              className='hover:opacity-100 opacity-75 '
              activeClassName='opacity-100'
            >
              Find a Job
            </NavLink>
          </li>

          <li className='py-4 px-6 border-b border-gray-300'>
            <NavLink
              exact
              className='hover:opacity-100 opacity-75 '
              href='/learning-resources'
              activeClassName='opacity-100'
            >
              Learning Resources
            </NavLink>
          </li>

          <li className='py-4 px-6 border-b border-gray-300'>
            <NavLink
              className='opacity-75 hover:opacity-100'
              href='/get-in-touch'
              activeClassName='opacity-100'
            >
              Get in Touch
            </NavLink>
          </li>

          <li className='py-4 px-6 border-b border-gray-300'>
            <NavLink
              className='opacity-75 hover:opacity-100'
              href='/contributors'
              activeClassName='opacity-100'
            >
              Contributors
            </NavLink>
          </li>
          <li className='bg-teal-300 text-blue-900 ml-6 px-3 w-1/2 text-center py-2 mt-4 font-bold uppercase'>
            <NavLink href='/post-a-job'>Post a Job</NavLink>
          </li>
        </ul>
      </nav>

      <nav
        data-cy='desktop-nav'
        className='hidden lg:block text-blue-900 text-sm uppercase font-medium'
        role='navigation'
      >
        <ul className='flex justify-between'>
          <li
            className='menu-item quick-filter mt-1 pr-4 lg:pr-10 cursor-pointer'
            aria-haspopup='true'
          >
            <NavLink
              href='/job-board'
              className='opacity-75 pb-3 hover:opacity-100 border-b-2 border-transparent'
              activeClassName='border-teal-500'
            >
              Find a Job
            </NavLink>
            <ul
              data-cy='quick-filter'
              className='submenu absolute mt-2 bg-white p-4 shadow-md rounded'
              aria-label='submenu'
            >
              <li className='mb-3'>
                <NavLink
                  href='/'
                  className='submenu-item opacity-75 hover:opacity-100 border-b border-transparent transition-colors duration-75 hover:border-teal-500 w-full pb-1'
                >
                  Front-end
                </NavLink>
              </li>
              <li className='mb-3'>
                <NavLink
                  href='/'
                  className='submenu-item opacity-75 hover:opacity-100 border-b border-transparent transition-colors duration-75 hover:border-teal-500 w-full pb-1'
                >
                  Back-end
                </NavLink>
              </li>
              <li>
                <NavLink
                  href='/'
                  className='submenu-item opacity-75 hover:opacity-100 border-b border-transparent transition-colors duration-75 hover:border-teal-500 w-full pb-1'
                >
                  Full-stack
                </NavLink>
              </li>
            </ul>
          </li>

          <li className='menu-item mt-1 pr-4 lg:pr-10 opacity-75 hover:opacity-100'>
            <NavLink
              href='/learning-resources'
              className='pb-3 border-b-2 transition-colors duration-75 hover:border-teal-500 '
              activeClassName='border-teal-500'
              inactiveClassName='border-transparent'
            >
              Learning Resources
            </NavLink>
          </li>

          <li className='menu-item mt-1 pr-4 lg:pr-10 opacity-75 hover:opacity-100'>
            <NavLink
              href='/get-in-touch'
              className='pb-3 border-b-2 transition-colors duration-75 hover:border-teal-500 '
              activeClassName='border-teal-500'
              inactiveClassName='border-transparent'
            >
              Get in Touch
            </NavLink>
          </li>

          <li className='menu-item mt-1 pr-4 lg:pr-10 opacity-75 hover:opacity-100'>
            <NavLink
              href='/contributors'
              className='pb-3 border-b-2 transition-colors duration-75 hover:border-teal-500 '
              activeClassName='border-teal-500'
              inactiveClassName='border-transparent'
            >
              Contributors
            </NavLink>
          </li>

          <li className='btn btn-teal'>
            <NavLink href='/post-a-job'>Post a Job</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default GlobalHeader
