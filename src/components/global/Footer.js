/* eslint-disable no-alert */
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as ROUTES from '../../constants/routes'

import GrayLogo from '../../assets/images/svg/protege-logo-mark-gray'
import TwitterIcon from '../../assets/images/svg/twitter-brands'
import StripeIcon from '../../assets/images/svg/Stripe'

const Footer = () => {
  const location = useLocation().pathname
  const [userEmail, setUserEmail] = useState('')

  async function subscribeEmail(e) {
    e.preventDefault()

    const tagId = 1446683
    const dataToSend = {
      api_key: process.env.REACT_APP_CONVERTKIT_KEY,
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
    ).then(alert("You've been subscribed to the Protege.dev email!"))
    setUserEmail('')
  }

  return (
    <motion.footer
      className={`mt-20 ${
        location === '/admin' || location === '/sign-in' ? 'hidden' : null
      }`}
      animate={{
        opacity: [0, 1],
        transition: {
          delay: 0.5,
        },
      }}
    >
      <div data-cy='footer' className='px-3 py-4 mb-6 bg-gray-200 md:px-0'>
        <form
          className='container mx-auto'
          name='email-list'
          onSubmit={subscribeEmail}
        >
          <div className='flex flex-col items-center justify-center md:flex-row'>
            <label
              className='text-lg font-semibold text-center text-blue-900 md:mr-6 md:text-left'
              htmlFor='newsletter-email'
            >
              Sign up for our mailing list!
            </label>

            <input
              value={userEmail}
              data-cy='mailing-list-signup'
              type='email'
              className='w-full px-4 py-1 my-3 md:w-2/5 md:my-0'
              id='newsletter-email'
              autoComplete='off'
              onChange={(e) => setUserEmail(e.target.value)}
              name='email'
              required
            />

            <button
              data-cy='mailing-list-signup-button'
              type='submit'
              className='w-full btn btn-blue md:w-auto'
            >
              Sign Up
            </button>
          </div>

          <p className='mt-3 text-sm text-center text-blue-700'>
            Stay up to date on improvements to Protege.dev and when new
            opportunities arrive!
          </p>
        </form>
      </div>

      <div className='container px-8 mx-auto'>
        <div className='flex justify-between'>
          <GrayLogo />

          <div data-cy='footer-links' className='flex flex-col items-end'>
            <ul className='mb-3 text-right'>
              <li className='mb-1'>
                <Link
                  className='text-blue-900 opacity-75 hover:opacity-100'
                  to={ROUTES.JOB_BOARD}
                >
                  Find a Job
                </Link>
              </li>

              <li className='mb-1'>
                <Link
                  className='text-blue-900 opacity-75 hover:opacity-100'
                  to={ROUTES.LEARNING}
                >
                  Learning Resources
                </Link>
              </li>

              <li>
                <Link
                  className='text-blue-900 opacity-75 hover:opacity-100'
                  to={ROUTES.POST_A_JOB}
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <a
                  className='text-blue-900 opacity-75 hover:opacity-100'
                  href='https://github.com/drewclem/protege/issues'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Contribute to Protege
                </a>
              </li>
            </ul>

            <a
              href='https://twitter.com/devprotege'
              className='w-6 text-teal-300 transition-colors duration-75 ease-in-out hover:text-teal-600'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Follow Protege on Twitter'
            >
              <TwitterIcon />
            </a>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center m-6 tracking-wide lg:flex-row'>
        <p className='mb-4 text-blue-700 lg:mr-12 lg:mb-0'>
          Copyright 2020 © Protege.dev
        </p>
        <a
          href='https://stripe.com'
          className='-mt-1 text-blue-300 transition duration-150 ease-in-out hover:text-blue-900'
          aria-label='Stripe'
        >
          <StripeIcon className='text-blue-200' />
        </a>
      </div>
    </motion.footer>
  )
}

export default Footer
