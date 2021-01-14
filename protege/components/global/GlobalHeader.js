import { useState } from 'react'
import Link from 'next/link'
import NavLink from 'components/global/NavLink'
import Logo from './ProtegeLogo'

const GlobalHeader = () => {
  const [active, setActive] = useState(false)
  return (
    <header className='container flex justify-between items-center py-6 px-6 xl:px-0'>
      <Link href='/' className='w-1/2 md:w-1/6 h-auto'>
        <a>
          <Logo />
        </a>
      </Link>

      <nav
        data-cy='mobile-nav'
        className='md:hidden text-blue-900 text-right relative'
      >
        {/* <button
          className='nav-toggle relative md:hidden h-6 w-6 mr-2'
          aria-label='navigation'
          onClick={() => setActive((oldActive) => !oldActive)}
          type='button'
        >
          <MenuIcon />
        </button> */}

        <ul
          className={`${
            active ? 'absolute' : 'hidden'
          } mt-2 text-center uppercase right-0 font-medium bg-white shadow-lg p-2 w-screen mx-auto`}
        >
          <li className='pt-3 pb-2 border-b-2 border-gray-300'>
            <NavLink
              href='/job-board'
              className='hover:opacity-100 opacity-75 '
              activeClassName='opacity-100'
            >
              Find a Job
            </NavLink>
          </li>

          <li className='pt-3 pb-2 border-b-2 border-gray-300'>
            <NavLink
              exact
              className='hover:opacity-100 opacity-75 '
              href='/'
              activeClassName='opacity-100'
            >
              Learning Resources
            </NavLink>
          </li>

          <li className='pt-3 pb-2 border-b-2 border-gray-300'>
            <NavLink
              className='opacity-75 hover:opacity-100'
              href='/'
              activeClassName='opacity-100'
            >
              Get in Touch
            </NavLink>
          </li>

          <li className='pt-3 pb-2 border-b-2 border-gray-300'>
            <NavLink
              className='opacity-75 hover:opacity-100'
              href='/'
              activeClassName='opacity-100'
            >
              Contributors
            </NavLink>
          </li>
          <li className='bg-teal-300 px-4 mt-3 mb-1 w-1/2 py-1 mx-auto font-bold'>
            <NavLink href='/'>Post a Job</NavLink>
          </li>
        </ul>
      </nav>

      <nav
        data-cy='desktop-nav'
        className='hidden md:block text-blue-900 text-sm uppercase font-medium'
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
                  className='submenu-item opacity-75 hover:opacity-100 border-b-2 border-transparent transition-colors duration-75 hover:border-teal-500 w-full pb-1'
                >
                  Front-end
                </NavLink>
              </li>
              <li className='mb-3'>
                <NavLink
                  href='/'
                  className='submenu-item opacity-75 hover:opacity-100 border-b-2 border-transparent transition-colors duration-75 hover:border-teal-500 w-full pb-1'
                >
                  Back-end
                </NavLink>
              </li>
              <li>
                <NavLink
                  href='/'
                  className='submenu-item opacity-75 hover:opacity-100 border-b-2 border-transparent transition-colors duration-75 hover:border-teal-500 w-full pb-1'
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
            <NavLink href='/'>Post a Job</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default GlobalHeader
