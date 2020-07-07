import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { motion } from 'framer-motion'

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

      <div className='container mx-auto px-3'>
        <div className='flex justify-between'>
          <svg
            width='99'
            height='119'
            viewBox='0 0 99 119'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M51.6401 85.2022V98.3799C51.6704 98.3799 51.7007 98.3799 51.731 98.3799V118.509H0.36322V54.8572C1.60428 65.7378 6.3869 75.5305 13.5608 83.0865V105.362H38.5636V62.2318H15.6494C14.0754 58.1818 13.2279 53.7993 13.2279 49.2355V49.0844H51.731V85.2022C51.7007 85.2022 51.6704 85.2022 51.6401 85.2022Z'
              fill='#D6D6D6'
            />
            <path
              d='M98.6188 49.205C98.6188 75.5907 77.8235 97.1104 51.731 98.3798V85.202C70.5285 83.9628 85.4514 68.3067 85.4514 49.2352C85.4514 29.3477 69.2571 13.1777 49.3397 13.1777C29.4827 13.1777 13.3187 29.257 13.2279 49.0841V49.2352C13.2279 53.8293 14.1057 58.2118 15.6495 62.2316C19.5845 72.3567 27.9995 80.3057 38.4426 83.6001V97.2312C28.7562 95.0551 20.1294 90.0077 13.5306 83.0561C6.35664 75.5303 1.57403 65.7074 0.332967 54.8267C0.121079 52.983 0 51.1091 0 49.205C0.0302697 22.0334 22.0969 0 49.3397 0C76.5824 0 98.6188 22.0334 98.6188 49.205Z'
              fill='#D6D6D6'
            />
            <path
              d='M46.7969 31.8564C49.5218 31.8564 51.7308 29.6508 51.7308 26.9299C51.7308 24.2091 49.5218 22.0034 46.7969 22.0034C44.0719 22.0034 41.8629 24.2091 41.8629 26.9299C41.8629 29.6508 44.0719 31.8564 46.7969 31.8564Z'
              fill='#D6D6D6'
            />
            <path
              d='M46.7969 43.009C48.6525 43.009 50.1568 41.507 50.1568 39.6542C50.1568 37.8013 48.6525 36.2993 46.7969 36.2993C44.9412 36.2993 43.437 37.8013 43.437 39.6542C43.437 41.507 44.9412 43.009 46.7969 43.009Z'
              fill='#D6D6D6'
            />
          </svg>

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
                  target='_'
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
            >
              <svg
                className='fill-current'
                aria-hidden='true'
                focusable='false'
                data-prefix='fab'
                data-icon='twitter'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 512 512'
              >
                <path
                  fill='currentColor'
                  d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z'
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className='m-4 flex-col mx-auto text-center text-blue-600 tracking-wide'>
        Copyright 2020 © Protege.dev
      </div>
    </motion.footer>
  )
}

export default Footer
