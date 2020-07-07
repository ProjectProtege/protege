import React from 'react'
import Layout from '../layouts/Layout'
import { motion } from 'framer-motion'

const contributorsList = [
  {
    id: 1,
    name: 'Bryan Kegley',
    website: '',
    twitter: '@bkegley',
  },
  {
    id: 2,
    name: 'Bitmasher',
    website: 'github.com/bitmasher',
    twitter: '',
  },
  {
    id: 3,
    name: 'Josh Leikam',
    website: 'joshleikam.com',
    twitter: '@josh_leikam',
  },
  {
    id: 4,
    name: 'Otto Gutierrez',
    website: 'ottogutierrez.com',
    twitter: '@ThisIsOtto',
  },
  {
    id: 5,
    name: 'Sara McCombs',
    website: 'theSaraMcCombs.com',
    twitter: '@dino_momma',
  },
  {
    id: 6,
    name: 'Laurent',
    website: 'www.laurentcodes.me',
    twitter: '@laurentcodes',
  },
  {
    id: 7,
    name: 'Sean Washington',
    website: 'seanwash.com',
    twitter: '@seanwashbot',
  },
  {
    id: 8,
    name: 'Nick Queb',
    website: 'kidqueb.com',
    twitter: '@kidqueb',
  },
]

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
        <table className='table-fixed container'>
          <tr className='text-teal-600'>
            <th
              scope='col'
              className='text-left w-1/3 px-4 md:pr-4 md:pl-0 py-2'
            >
              Name
            </th>
            <th
              scope='col'
              className='text-left w-1/3 px-4 md:pr-4 md:pl-0 py-2'
            >
              Website
            </th>
            <th scope='col' className='text-left w-1/3 px-4 py-2'>
              Twitter
            </th>
          </tr>
          {contributorsList.map((contributor) => (
            <tr className='text-blue-200' id={contributor.id}>
              <td className='px-4 md:pr-4 md:pl-0 py-2'>{contributor.name}</td>
              <td className='px-4 md:pr-4 md:pl-0 py-2'>
                <a
                  href={`https:// ` + contributor.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mb-3 text-blue-300 hover:text-teal-600'
                >
                  {contributor.website}
                </a>
              </td>
              <td className='px-4 py-2'>
                <a
                  href={'http://twitter.com/' + contributor.twitter}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mb-3 text-blue-300 hover:text-teal-600'
                >
                  {contributor.twitter}
                </a>
              </td>
            </tr>
          ))}
        </table>
      </motion.div>
    </Layout>
  )
}

export default Contributors
