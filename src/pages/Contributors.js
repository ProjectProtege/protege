import React, { useEffect, useState } from 'react'
import Layout from '../layouts/Layout'
import { motion } from 'framer-motion'

const Contributors = () => {
  return (
    <Layout>
      <motion.div
        className='container mx-auto pt-32 px-2 md:px-0'
        style={{ maxWidth: 680 }}
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: [0, 1],
          y: [-10, 0],
        }}
        transition={{
          duration: 0.3,
          ease: 'easeIn',
        }}
      >
        <h1 className='text-2xl font-semibold text-blue-900 mb-3'>
          Protege.dev Contributors!
        </h1>

        <p className='text-blue-600 mb-12'>
          Here are Protege, we're only as strong as the community that surrounds
          us and that we aim to serve.
          <br />
          <br />
          Below is a list of amazing individuals from that community who have
          personally donated their time efforts to improving our platform. We're
          incredibly grateful that anyone would take time out of their day and
          lend us a helping hand and welcome any who want to aid in our mission.
          <br />
          <br />
          Want to join this list of awesomeness? Check our repo for any&nbsp;
          <a
            className='underline mb-3 text-blue-900 hover:text-teal-600'
            href='https://github.com/drewclem/protege/issues'
          >
            Active Issues
          </a>
          &nbsp;and send in a PR! It's that easy!
        </p>
        <ContributorsList />
      </motion.div>
    </Layout>
  )
}

export default Contributors

const OGContributors = [
  {
    login: 'BitMasher',
    id: 61257372,
    node_id: 'MDQ6VXNlcjYxMjU3Mzcy',
    avatar_url: 'https://avatars2.githubusercontent.com/u/61257372?v=4',
    url: 'https://api.github.com/users/BitMasher',
    html_url: 'https://github.com/BitMasher',
    name: null,
    blog: '',
    twitter_username: null,
  },
  {
    login: 'bkegley',
    id: 24785958,
    node_id: 'MDQ6VXNlcjI0Nzg1OTU4',
    avatar_url: 'https://avatars1.githubusercontent.com/u/24785958?v=4',
    url: 'https://api.github.com/users/bkegley',
    html_url: 'https://github.com/bkegley',
    name: null,
    blog: '',
    twitter_username: null,
  },
  {
    login: 'kidqueb',
    id: 884128,
    node_id: 'MDQ6VXNlcjg4NDEyOA==',
    avatar_url: 'https://avatars3.githubusercontent.com/u/884128?v=4',
    url: 'https://api.github.com/users/kidqueb',
    html_url: 'https://github.com/kidqueb',
    name: 'Nick Quebbeman',
    blog: 'http://kidqueb.com',
    twitter_username: null,
  },
]

const ContributorsList = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [contributors, setContributors] = useState([])
  console.log(contributors)
  useEffect(() => {
    fetch('https://api.github.com/repos/drewclem/protege/contributors')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          let simplifiedContributors = result.map((contributor) => {
            const {
              url,
              id,
              avatar_url,
              login,
              html_url,
              contributions,
            } = contributor
            console.log(url)
            return { url, id, avatar_url, login, html_url, contributions }
          })
          setContributors(simplifiedContributors)
          return simplifiedContributors
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className='grid md:grid-cols-2 row-gap-5 gap-5'>
        {contributors.map((contributor) => {
          const { url, id, contributions, login } = contributor
          console.log('login', login)
          if (login === 'ImgBotApp') {
            return null
          }
          return (
            <div>
              <IndividualContributor
                key={id}
                url={url}
                contributor={contributor}
                contributions={contributions}
              />
            </div>
          )
        })}
        {OGContributors.map((OGContributor) => {
          return (
            <IndividualContributor
              key={OGContributor.id}
              url={OGContributor.url}
              contributor={OGContributor}
              contributions={'Special'}
            />
          )
        })}
      </div>
    )
  }
}

const IndividualContributor = (props) => {
  const { url, contributor, contributions } = props
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [contributorData, setContributorData] = useState([])

  function blogLinkFormatter(url) {
    if (!url.includes('https://')) {
      return 'https://' + url
    } else return url
  }

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setContributorData(result)
          return result
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    const {
      name,
      twitter_username,
      avatar_url,
      blog,
      html_url,
    } = contributorData
    console.log(blog)
    return (
      <div className='flex items-center px-4 py-6 text-center bg-white shadow border-l-4 border-teal-500 transition duration-150 ease-in-out'>
        <div className='flex flex-col ml-2 items-center justify-between'>
          <img
            className='rounded-full h-24 w-24 mx-auto'
            src={avatar_url}
            alt={`${name} avatar`}
          />
        </div>
        <div className='flex flex-col ml-6 items-start'>
          {name ? (
            <span className='font-semibold mb-2 text-blue-900'>{name}</span>
          ) : (
            <span className='font-semibold mb-2 text-blue-900'>
              {contributor.login}
            </span>
          )}
          <div className='flex items-center mb-2'>
            {twitter_username && (
              <a
                href={`https://twitter.com/${twitter_username}`}
                className='flex mr-4 items-center text-teal-500 hover:text-teal-800 transition-colors ease-in-out duration-75 w-auto'
                target='_blank'
                rel='noopener noreferrer'
              >
                <svg
                  className='fill-current flex-shrink w-4'
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
            )}
            <a
              href={html_url}
              className='mr-4 text-teal-500 hover:text-teal-800'
              target='_blank'
              rel='noopener noreferrer'
            >
              <svg
                className='fill-current flex-shrink w-4'
                aria-hidden='true'
                focusable='false'
                data-prefix='fab'
                data-icon='twitter'
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
              >
                <svg
                  className='fill-current flex-shrink w-4'
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fab'
                  data-icon='twitter'
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
          <span className='text-blue-500'>
            {contributions} {contributions > 1 ? 'Commits' : 'Commit'}
          </span>
        </div>
      </div>
    )
  }
}
