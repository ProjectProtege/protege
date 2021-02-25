/* eslint-disable no-alert */
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LogoMark from 'assets/images/protege-logo-mark-gray'
import TwitterIcon from 'assets/images/TwitterBrands'
import StripeIcon from 'assets/images/Stripe'

const GlobalFooter = () => {
  const location = useRouter().pathname
  const [userEmail, setUserEmail] = useState('')

  async function subscribeEmail(e) {
    e.preventDefault()

    const tagId = 1446683

    const dataToSend = {
      api_key: process.env.CONVERTKIT_KEY,
      email: userEmail,
    }

    const options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(dataToSend),
    }

    await fetch(
      `https://api.convertkit.com/v3/tags/${tagId}/subscribe`,
      options
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network reponse was not ok').then(
            alert('Oops! something went wrong.')
          )
        } else {
          alert("Congrats! You've successfully subscribed!")
        }
      })
      .catch((err) => {
        alert('There was a problem with your fetch operation', err)
      })

    setUserEmail('')
  }

  return (
    <footer
      className={`bg-white mt-20 ${
        location === '/admin' || location === '/sign-in' ? 'hidden' : null
      }`}
    >
      <div data-cy='footer' className='py-4 mb-6 bg-gray-200'>
        <div className='container px-8 mx-auto sm:max-w-screen-lg lg:px-0'>
          <form name='email-list' onSubmit={subscribeEmail}>
            <div className='flex flex-col items-center'>
              <label
                className='text-lg font-semibold text-blue-900 md:mr-6'
                htmlFor='newsletter-email'
              >
                Sign up for our mailing list!
              </label>

              <p className='mb-3 text-sm text-blue-700'>
                Stay up to date on new features and job opportunities.
              </p>

              <div className='flex justify-center w-full md:w-1/2'>
                <input
                  value={userEmail}
                  data-cy='mailing-list-signup'
                  type='email'
                  className='px-4 py-1 rounded-r-none md:w-2/3 rounded-l-md outline-teal'
                  id='newsletter-email'
                  autoComplete='off'
                  onChange={(e) => setUserEmail(e.target.value)}
                  name='email'
                  required
                />

                <button
                  data-cy='mailing-list-signup-button'
                  type='submit'
                  className='rounded-l-none shadow rounded-r-md btn btn-blue'
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='container px-8 mx-auto sm:max-w-screen-lg lg:px-0'>
        <div className='flex justify-between'>
          <div className='w-24'>
            <LogoMark />
          </div>

          <div data-cy='footer-links' className='flex flex-col items-end'>
            <ul className='mb-3 text-right'>
              <li className='mb-1'>
                <Link href='/job-board'>
                  <a className='text-blue-900 opacity-75 hover:opacity-100'>
                    Find a Job
                  </a>
                </Link>
              </li>

              <li className='mb-1'>
                <Link href='/learning-resources'>
                  <a className='text-blue-900 opacity-75 hover:opacity-100'>
                    Learning Resources
                  </a>
                </Link>
              </li>

              <li>
                <Link href='/post-a-job'>
                  <a className='text-blue-900 opacity-75 hover:opacity-100'>
                    Post a Job
                  </a>
                </Link>
              </li>
              <li>
                <a
                  className='text-blue-900 opacity-75 hover:opacity-100'
                  href='https://github.com/drewclem/protege#submitting-a-pr'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Contribute to Protegé
                </a>
              </li>
            </ul>

            <a
              href='https://twitter.com/devprotege'
              className='w-6 text-teal-300 duration-75 -colors hover:text-teal-600 focus:text-teal-600'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Follow Protegé on Twitter'
            >
              <TwitterIcon />
            </a>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center m-6 tracking-wide lg:flex-row'>
        <p className='mb-4 text-blue-700 lg:mr-12 lg:mb-0'>
          Copyright {new Date().getFullYear()} © Protege.dev
        </p>
        <a
          href='https://stripe.com'
          className='-mt-1 text-blue-300 hover:text-blue-900 focus:text-blue-900'
          aria-label='Stripe'
        >
          <StripeIcon className='text-blue-200' />
        </a>
      </div>
    </footer>
  )
}

export default GlobalFooter
