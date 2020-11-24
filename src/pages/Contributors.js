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
      className='container px-2 pt-32 mx-auto md:px-0'
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
      <div className='mx-auto' style={{ maxWidth: 680 }}>
        <h1 className='mb-3 text-2xl font-semibold text-blue-900'>
          Protege.dev Contributors!
        </h1>

        <p className='mb-12 text-blue-700'>
          Here are Protege, we&apos;re only as strong as the community that
          surrounds us and that we aim to serve.
          <br />
          <br />
          Below is a list of amazing individuals from that community who have
          personally donated their time efforts to improving our platform.
          We&apos;re incredibly grateful that anyone would take time out of
          their day and lend us a helping hand and welcome any who want to aid
          in our mission.
          <br />
          <br />
          Want to join this list of awesomeness? Check our repo for any&nbsp;
          <a
            className='mb-3 text-blue-900 underline hover:text-teal-600'
            href='https://github.com/drewclem/protege/issues'
          >
            Active Issues
          </a>
          &nbsp;and send in a PR! It&apos;s that easy!
        </p>
      </div>
      <ContributorsList contributors={filteredContributors.regular} />

      <div className='mx-auto' style={{ maxWidth: 680 }}>
        <h2 className='mt-16 mb-3 text-xl font-semibold text-blue-900'>
          Founders
        </h2>
        <ContributorsList
          contributors={filteredContributors.founders}
          isFounders
        />
      </div>
    </motion.div>
  )
}

export default Contributors
