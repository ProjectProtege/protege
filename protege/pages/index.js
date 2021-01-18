import Link from 'next/link'

import FindYourNext from 'components/home/FindYourNext'

// import { db } from 'firebase/firebase'

const Home = () => {
  return (
    <div>
      <img
        src='/hero-bg-pattern.png'
        className='hidden lg:block absolute inset-0 w-full'
        alt=''
        style={{ zIndex: '-999999' }}
      />

      <h1 className='sr-only'>Home</h1>

      <section className='pt-12'>
        <FindYourNext />

        <div className='flex flex-col mx-auto mt-12 text-center md:w-3/4 text-blue-900 md:tracking-wide lg:w-3/4 xl:w-1/2 md:text-lg'>
          <h2 className='font-medium md:text-2xl mb-4'>
            Remote jobs for junior developers.
          </h2>

          <p className='mx-auto mb-8 opacity-75'>
            Looking for your next junior developer role? Look no further! Any
            jobs listed here are geared for those hungry to work and learn.
          </p>

          <button className='mx-auto btn btn-teal' type='button'>
            <Link href='/job-board'>
              <a>Find a Job</a>
            </Link>
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
