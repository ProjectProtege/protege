import { useEffect } from 'react'
import { useUi } from 'store/ui_store'
import { useRouter } from 'next/router'
import Link from 'next/link'

import NavLink from 'components/global/NavLink'
import CloseIcon from 'components/global/CloseIcon'
import MenuIcon from 'assets/images/MenuIcon'
import Logo from 'assets/images/ProtegeLogo'

const GlobalHeader = () => {
  const router = useRouter()
  const isNavOpen = useUi((s) => s.isNavOpen)
  const setIsNavOpen = useUi((s) => s.setIsNavOpen)

  const location = useRouter().route

  useEffect(() => {
    const handleRouteChange = () => {
      setIsNavOpen(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  function toggleNav() {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <header
      className={`${location !== '/' ? 'lg:bg-white lg:shadow' : ''} py-3 `}
    >
      <div className='relative container flex justify-between items-center px-6 xl:px-2'>
        <Link href='/'>
          <a className='w-2/3 md:w-64'>
            <Logo className='w-full' />
          </a>
        </Link>

        <button
          className='absolute right-0 w-12 h-12 p-2 mr-4 text-blue-900 lg:hidden'
          aria-label='navigation'
          onClick={toggleNav}
          type='button'
        >
          <MenuIcon />
        </button>

        <nav
          data-cy='mobile-nav'
          className={`${
            isNavOpen ? 'translate-0' : 'translate-x-full'
          } lg:hidden fixed w-screen max-w-md top-0 right-0 flex flex-row transform transition duration-150 ease-in-out z-50`}
        >
          <button
            className='flex items-center justify-center w-16 mt-8 ml-2 text-blue-900 bg-white rounded-full shadow-md h-14 lg:hidden'
            aria-label='navigation'
            onClick={toggleNav}
            type='button'
          >
            <CloseIcon />
          </button>

          <ul className='w-full h-screen ml-2 bg-white shadow-xl'>
            <li className='px-6 py-4 border-b border-gray-300'>
              <NavLink
                href='/'
                className='opacity-75 hover:opacity-100'
                activeClassName='opacity-100'
              >
                Home
              </NavLink>
            </li>
            <li className='px-6 py-4 border-b border-gray-300'>
              <NavLink
                href='/job-board'
                className='opacity-75 hover:opacity-100'
                activeClassName='opacity-100'
              >
                Find a Job
              </NavLink>
            </li>

            <li className='px-6 py-4 border-b border-gray-300'>
              <NavLink
                className='opacity-75 hover:opacity-100'
                href='/learning-resources'
                activeClassName='opacity-100'
              >
                Learning Resources
              </NavLink>
            </li>

            <li className='px-6 py-4 border-b border-gray-300'>
              <NavLink
                className='opacity-75 hover:opacity-100'
                href='/get-in-touch'
                activeClassName='opacity-100'
              >
                Get in Touch
              </NavLink>
            </li>

            <li className='px-6 py-4 border-b border-gray-300'>
              <NavLink
                className='opacity-75 hover:opacity-100'
                href='/contributors'
                activeClassName='opacity-100'
              >
                Contributors
              </NavLink>
            </li>
            <li className='px-6 py-4 border-b border-gray-300'>
              <Link href='/post-a-job?status=1'>
                <a className='btn btn-teal'>Post a Job</a>
              </Link>
            </li>
          </ul>
        </nav>

        <nav
          data-cy='desktop-nav'
          className='z-50 hidden text-sm font-semibold text-blue-900 uppercase lg:block'
          role='navigation'
        >
          <ul className='flex justify-between'>
            <li className='pr-4 cursor-pointer menu-item quick-filter lg:pr-10'>
              <NavLink
                href='/job-board'
                className='py-3 border-b-2 border-transparent opacity-75 hover:opacity-100'
                activeClassName='border-teal-500'
              >
                Find a Job
              </NavLink>
              <ul
                data-cy='quick-filter'
                className='absolute p-4 mt-2 bg-white rounded shadow-md submenu'
                aria-label='submenu'
              >
                <li className='mb-3'>
                  <NavLink
                    href='/job-board?filter=Front-end'
                    className='w-full pb-1 duration-75 border-b border-transparent opacity-75 submenu-item hover:opacity-100 hover:border-teal-500'
                  >
                    Front-end
                  </NavLink>
                </li>
                <li className='mb-3'>
                  <NavLink
                    href='/job-board?filter=Back-end'
                    className='w-full pb-1 duration-75 border-b border-transparent opacity-75 submenu-item hover:opacity-100 hover:border-teal-500'
                  >
                    Back-end
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href='/job-board?filter=Full-stack'
                    className='w-full pb-1 duration-75 border-b border-transparent opacity-75 submenu-item hover:opacity-100 hover:border-teal-500'
                  >
                    Full-stack
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='pr-4 opacity-75 menu-item lg:pr-10 hover:opacity-100'>
              <NavLink
                href='/learning-resources'
                className='py-3 duration-75 border-b-2 hover:border-teal-500 '
                activeClassName='border-teal-500'
                inactiveClassName='border-transparent'
              >
                Learning Resources
              </NavLink>
            </li>

            <li className='pr-4 opacity-75 menu-item lg:pr-10 hover:opacity-100'>
              <NavLink
                href='/get-in-touch'
                className='py-3 duration-75 border-b-2 hover:border-teal-500 '
                activeClassName='border-teal-500'
                inactiveClassName='border-transparent'
              >
                Get in Touch
              </NavLink>
            </li>

            <li className='pr-4 opacity-75 menu-item lg:pr-10 hover:opacity-100'>
              <NavLink
                href='/contributors'
                className='py-3 duration-75 border-b-2 hover:border-teal-500 '
                activeClassName='border-teal-500'
                inactiveClassName='border-transparent'
              >
                Contributors
              </NavLink>
            </li>

            <li>
              <Link href='/post-a-job?status=1'>
                <a className='btn btn-teal'>Post a Job</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default GlobalHeader
