import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import { motion } from 'framer-motion'

import GrayLogo from '../../assets/images/svg/protege-logo-mark-gray'
import TwitterIcon from '../../assets/images/svg/twitter-brands'
import StripeIcon from '../../assets/images/svg/Stripe'

const Footer = () => {
  const [email, setEmail] = useState('')

  async function subscribeEmail(e) {
    e.preventDefault()

    const tagId = 1446683
    const dataToSend = {
      api_key: process.env.REACT_APP_CONVERTKIT_KEY,
      email: email,
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
    setEmail('')
  }

  return (
    <motion.footer
      className='mt-20'
      animate={{
        opacity: [0, 1],
        transition: {
          delay: 0.5,
        },
      }}
    >
      <div data-cy='footer' className='bg-gray-200 py-4 px-3 md:px-0 mb-6'>
        <form
          className='container mx-auto'
          name='email-list'
          onSubmit={subscribeEmail}
        >
          <div className='flex flex-col md:flex-row justify-center items-center'>
            <label
              className='text-blue-900 text-lg md:mr-6 font-semibold text-center md:text-left'
              htmlFor='newsletter-email'
            >
              Sign up for our mailing list!
            </label>

            <input
              value={email}
              data-cy='mailing-list-signup'
              type='email'
              className='px-4 py-1 w-full md:w-2/5 my-3 md:my-0'
              id='newsletter-email'
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              required
            />

            <button
              data-cy='mailing-list-signup-button'
              type='submit'
              className='btn btn-blue w-full md:w-auto'
            >
              Sign Up
            </button>
          </div>

          <p className='text-center text-sm mt-3 text-blue-700'>
            Stay up to date on improvements to Protege.dev and when new
            opportunities arrive!
          </p>
        </form>
      </div>

      <div className='container mx-auto px-8'>
        <div className='flex justify-between'>
          <GrayLogo />

          <div data-cy='footer-links' className='flex flex-col items-end'>
            <ul className='text-right mb-3'>
              <li className='mb-1'>
                <Link
                  className='text-blue-800 opacity-75 hover:opacity-100'
                  to={ROUTES.JOB_BOARD}
                >
                  Find a Job
                </Link>
              </li>

              <li className='mb-1'>
                <Link
                  className='text-blue-800 opacity-75 hover:opacity-100'
                  to={ROUTES.LEARNING}
                >
                  Learning Resources
                </Link>
              </li>

              <li>
                <Link
                  className='text-blue-800 opacity-75 hover:opacity-100'
                  to={ROUTES.POST_A_JOB}
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <a
                  className='text-blue-800 opacity-75 hover:opacity-100'
                  href={'https://github.com/drewclem/protege/issues'}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Contribute to Protege
                </a>
              </li>
            </ul>

            <a
              href='https://twitter.com/devprotege'
              className='text-teal-300 hover:text-teal-600 transition-colors ease-in-out duration-75 w-6'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Follow Protege on Twitter'
            >
              <TwitterIcon />
            </a>
          </div>
        </div>
      </div>

      <div className='flex flex-col  items-center lg:flex-row justify-center tracking-wide m-6'>
        <p className='lg:mr-12 mb-4 lg:mb-0 text-blue-600'>
          Copyright 2020 © Protege.dev
        </p>
        <a
          href='https://stripe.com'
          className='text-blue-300 hover:text-blue-900 transition ease-in-out duration-150 -mt-1'
        >
          <StripeIcon className='text-blue-200' />
        </a>
      </div>
    </motion.footer>
  )
}

export default Footer
