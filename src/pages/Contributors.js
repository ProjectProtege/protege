import React from 'react'
import { motion } from 'framer-motion'
import contributors from '../data/contributors.json'

import ContributorsList from '../components/contributors/ContributorsList'

const Contributors = () => {
  const filteredContributors = contributors.reduce(
    (allContributors, contributor) => {
      allContributors[
        ['drewclem', 'pickleat'].includes(contributor.login)
          ? 'founders'
          : 'regular'
      ].push(contributor)
      return allContributors
    },
    { founders: [], regular: [] }
  )

  return (
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
        Here are Protege, we&apos;re only as strong as the community that
        surrounds us and that we aim to serve.
        <br />
        <br />
        Below is a list of amazing individuals from that community who have
        personally donated their time efforts to improving our platform.
        We&apos;re incredibly grateful that anyone would take time out of their
        day and lend us a helping hand and welcome any who want to aid in our
        mission.
        <br />
        <br />
        Want to join this list of awesomeness? Check our repo for any&nbsp;
        <a
          className='underline mb-3 text-blue-900 hover:text-teal-600'
          href='https://github.com/drewclem/protege/issues'
        >
          Active Issues
        </a>
        &nbsp;and send in a PR! It&apos;s that easy!
      </p>
      <ContributorsList contributors={filteredContributors.regular} />

      <h3 className='text-xl font-semibold text-blue-900 mt-16 mb-3'>
        Founders
      </h3>
      <ContributorsList contributors={filteredContributors.founders} />
    </motion.div>
  )
}

export default Contributors
