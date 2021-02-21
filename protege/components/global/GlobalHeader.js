import { useEffect } from 'react'
import { useUi } from 'store/ui_store'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import NavLink from 'components/global/NavLink'
import CloseIcon from 'components/global/CloseIcon'
import MenuIcon from 'assets/images/MenuIcon'

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
        <Link href='/' className='w-1/4 lg:w-1/6 h-auto'>
          <a>
            <span>
              <Image
                src='/images/protegeLogo.svg'
                layout='fixed'
                quality={100}
                width={230}
                height={60}
              />
            </span>
          </a>
        </Link>

        <button
          className='absolute right-0  mr-4 lg:hidden h-12 w-12 text-blue-900  p-2'
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
            className='lg:hidden h-12 w-12 text-blue-900 bg-white rounded-full p-1 shadow-md ml-2 mt-8'
            aria-label='navigation'
            onClick={toggleNav}
            type='button'
          >
            <CloseIcon />
          </button>

          <ul className='bg-white w-full h-screen shadow-xl ml-2'>
            <li className='py-4 px-6 border-b border-gray-300'>
              <NavLink
                href='/'
                className='hover:opacity-100 opacity-75'
                activeClassName='opacity-100'
              >
                Home
              </NavLink>
            </li>
            <li className='py-4 px-6 border-b border-gray-300'>
              <NavLink
                href='/job-board'
                className='hover:opacity-100 opacity-75'
                activeClassName='opacity-100'
              >
                Find a Job
              </NavLink>
            </li>

            <li className='py-4 px-6 border-b border-gray-300'>
              <NavLink
                className='hover:opacity-100 opacity-75'
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
            <li className='py-4 px-6 border-b border-gray-300'>
              <Link href='/post-a-job?status=1'>
                <a className='btn btn-teal'>Post a Job</a>
              </Link>
            </li>
          </ul>
        </nav>

        <nav
          data-cy='desktop-nav'
          className='hidden lg:block text-blue-900 text-sm uppercase font-semibold z-50'
          role='navigation'
        >
          <ul className='flex justify-between'>
            <li className='menu-item quick-filter  pr-4 lg:pr-10 cursor-pointer'>
              <NavLink
                href='/job-board'
                className='opacity-75 py-3 hover:opacity-100 border-b-2 border-transparent'
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
                    href='/job-board?filter=Front-end'
                    className='submenu-item opacity-75 hover:opacity-100 border-b border-transparent   duration-75 hover:border-teal-500 w-full pb-1'
                  >
                    Front-end
                  </NavLink>
                </li>
                <li className='mb-3'>
                  <NavLink
                    href='/job-board?filter=Back-end'
                    className='submenu-item opacity-75 hover:opacity-100 border-b border-transparent   duration-75 hover:border-teal-500 w-full pb-1'
                  >
                    Back-end
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    href='/job-board?filter=Full-stack'
                    className='submenu-item opacity-75 hover:opacity-100 border-b border-transparent   duration-75 hover:border-teal-500 w-full pb-1'
                  >
                    Full-stack
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='menu-item  pr-4 lg:pr-10 opacity-75 hover:opacity-100'>
              <NavLink
                href='/learning-resources'
                className='py-3 border-b-2   duration-75 hover:border-teal-500 '
                activeClassName='border-teal-500'
                inactiveClassName='border-transparent'
              >
                Learning Resources
              </NavLink>
            </li>

            <li className='menu-item  pr-4 lg:pr-10 opacity-75 hover:opacity-100'>
              <NavLink
                href='/get-in-touch'
                className='py-3 border-b-2   duration-75 hover:border-teal-500 '
                activeClassName='border-teal-500'
                inactiveClassName='border-transparent'
              >
                Get in Touch
              </NavLink>
            </li>

            <li className='menu-item  pr-4 lg:pr-10 opacity-75 hover:opacity-100'>
              <NavLink
                href='/contributors'
                className='py-3 border-b-2   duration-75 hover:border-teal-500 '
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
