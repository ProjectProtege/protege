/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const IndividualContributor = ({ contributor }) => {
  const {
    name,
    login,
    twitter_username,
    avatar_url,
    blog,
    html_url,
    contributions,
  } = contributor

  function blogLinkFormatter(url) {
    let formattedUrl = url

    if (!url.includes('https://')) {
      formattedUrl = `https://${url}`
    }

    return formattedUrl
  }

  return (
    <div className='relative grid grid-cols-3 gap-6 py-6 pl-6 pr-4 overflow-hidden text-center transition duration-150 ease-in-out bg-white rounded-md shadow md:text-left'>
      <div className='absolute left-0 w-2 h-full -mx-px bg-gradient-to-t from-teal-500 to-teal-300' />
      <div className='items-center col-span-1'>
        <div className='relative w-20 h-20 mt-1 overflow-hidden rounded-full'>
          <Image
            src={avatar_url}
            alt={`${name || login} avatar`}
            layout='fill'
          />
        </div>
      </div>
      <div className='flex flex-col items-start justify-center col-span-2 truncate'>
        {name ? (
          <span className='text-xl font-semibold text-blue-900 truncate'>
            {name}
          </span>
        ) : (
          <span className='text-xl font-semibold text-blue-900 truncate'>
            {login}
          </span>
        )}
        <div className='flex items-center my-2'>
          {twitter_username && (
            <a
              href={`https://twitter.com/${twitter_username}`}
              className='flex items-center w-auto mr-4 text-teal-500 transition-colors duration-75 ease-in-out hover:text-teal-800'
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${name || login}'s twitter`}
            >
              <svg
                className='flex-shrink w-4 fill-current'
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
                />
              </svg>
            </a>
          )}
          <a
            href={html_url}
            className='mr-4 text-teal-500 hover:text-teal-800'
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`${name || login}'s GitHub`}
          >
            <svg
              className='flex-shrink w-4 fill-current'
              aria-hidden='true'
              focusable='false'
              data-prefix='fab'
              data-icon='github'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 40 40'
            >
              <path
                d='M20 0.494995C8.95 0.494995 0 9.44999 0 20.495C0 29.3333 5.73 36.8283 13.675 39.47C14.675 39.6583 15.0417 39.04 15.0417 38.5083C15.0417 38.0333 15.025 36.775 15.0167 35.1083C9.45333 36.315 8.28 32.425 8.28 32.425C7.37 30.1167 6.055 29.5 6.055 29.5C4.24333 28.26 6.195 28.285 6.195 28.285C8.20333 28.425 9.25833 30.345 9.25833 30.345C11.0417 33.4033 13.94 32.52 15.0833 32.0083C15.2633 30.715 15.7783 29.8333 16.35 29.3333C11.9083 28.8333 7.24 27.1133 7.24 19.45C7.24 17.2667 8.015 15.4833 9.29833 14.0833C9.07333 13.5783 8.39833 11.545 9.47333 8.79C9.47333 8.79 11.1483 8.25333 14.9733 10.84C16.5733 10.395 18.2733 10.175 19.9733 10.165C21.6733 10.175 23.3733 10.395 24.9733 10.84C28.7733 8.25333 30.4483 8.79 30.4483 8.79C31.5233 11.545 30.8483 13.5783 30.6483 14.0833C31.9233 15.4833 32.6983 17.2667 32.6983 19.45C32.6983 27.1333 28.0233 28.825 23.5733 29.3167C24.2733 29.9167 24.9233 31.1433 24.9233 33.0167C24.9233 35.6933 24.8983 37.8433 24.8983 38.4933C24.8983 39.0183 25.2483 39.6433 26.2733 39.4433C34.275 36.82 40 29.32 40 20.495C40 9.44999 31.045 0.494995 20 0.494995Z'
                fill='currentColor'
              />
            </svg>
          </a>
          {blog && (
            <a
              href={blogLinkFormatter(blog)}
              className='text-teal-500 hover:text-teal-800'
              aria-label={`${name || login}'s blog`}
            >
              <svg
                className='flex-shrink w-4 fill-current'
                aria-hidden='true'
                focusable='false'
                data-prefix='fab'
                data-icon='globe'
                role='img'
                viewBox='0 0 40 40'
              >
                <path
                  d='M20 40C14.6957 40 9.60859 37.8929 5.85786 34.1421C2.10714 30.3914 0 25.3043 0 20C0 14.6957 2.10714 9.60859 5.85786 5.85786C9.60859 2.10714 14.6957 0 20 0C25.3043 0 30.3914 2.10714 34.1421 5.85786C37.8929 9.60859 40 14.6957 40 20C40 25.3043 37.8929 30.3914 34.1421 34.1421C30.3914 37.8929 25.3043 40 20 40ZM35.5 24C36.1765 21.3762 36.1765 18.6238 35.5 16H27.86C28.0453 18.6634 28.0453 21.3366 27.86 24H35.5ZM33.86 28H27.42C27.085 30.4107 26.4466 32.7694 25.52 35.02C29.0334 33.7239 31.9835 31.2408 33.86 28ZM16.16 24H23.84C24.0571 21.3378 24.0571 18.6622 23.84 16H16.16C15.9429 18.6622 15.9429 21.3378 16.16 24ZM16.66 28C17.48 32.8 18.92 36 20 36C21.08 36 22.52 32.8 23.34 28H16.66ZM4.5 24H12.14C11.9547 21.3366 11.9547 18.6634 12.14 16H4.5C3.82345 18.6238 3.82345 21.3762 4.5 24ZM6.14 28C8.01651 31.2408 10.9666 33.7239 14.48 35.02C13.64 33.1 13 30.7 12.58 28H6.14ZM33.86 12C31.9835 8.75921 29.0334 6.27607 25.52 4.98C26.36 6.9 27 9.3 27.42 12H33.86ZM16.66 12H23.34C22.52 7.2 21.08 4 20 4C18.92 4 17.48 7.2 16.66 12ZM6.14 12H12.58C12.98 9.3 13.64 6.9 14.48 4.98C10.9666 6.27607 8.01651 8.75921 6.14 12Z'
                  fill='currentColor'
                />
              </svg>
            </a>
          )}
        </div>
        <span className='text-blue-700'>
          {contributions}
          &nbsp;
          {contributions > 1 ? 'Commits' : 'Commit'}
        </span>
      </div>
    </div>
  )
}

IndividualContributor.propTypes = {
  contributor: PropTypes.shape({
    name: PropTypes.string,
    login: PropTypes.string.isRequired,
    twitter_username: PropTypes.string,
    avatar_url: PropTypes.string.isRequired,
    blog: PropTypes.string,
    html_url: PropTypes.string.isRequired,
    contributions: PropTypes.number.isRequired,
  }).isRequired,
}

export default IndividualContributor
