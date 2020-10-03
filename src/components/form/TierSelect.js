import React from 'react'
import PropTypes from 'prop-types'
import TierSelectCard from './TierSelectCard'

const TierSelect = ({ receivingTierClick, tier }) => {
  return (
    <div>
      <div className='grid max-w-5xl grid-cols-1 gap-6 mx-auto md:grid-cols-3'>
        <TierSelectCard
          value={process.env.REACT_APP_BASIC_PLAN}
          receivingTierClick={receivingTierClick}
          tier={tier}
        >
          <div className='col-span-1 text-center'>
            <div className='relative text-5xl font-bold leading-none text-blue-900 md:text-6xl'>
              <span className='absolute mt-4 -ml-4 text-2xl'>$</span>
              75
            </div>

            <p className='-mt-2 text-lg text-teal-900 md:text-xl md:mb-4'>
              Basic
            </p>
          </div>

          <ul className='col-span-2 pl-2 text-sm leading-6 text-blue-700'>
            <li>Featured on homepage</li>
            <li>Included in bi-weekly newsletter</li>
            <li>Tweet with link to listing</li>
          </ul>
        </TierSelectCard>

        <TierSelectCard
          value={process.env.REACT_APP_ADVANCED_PLAN}
          receivingTierClick={receivingTierClick}
          tier={tier}
        >
          <div className='col-span-1 text-center'>
            <div className='relative text-5xl font-bold leading-none text-blue-900 md:text-6xl'>
              <span className='absolute mt-4 -ml-4 text-2xl'>$</span>
              125
            </div>
            <p className='-mt-2 text-lg text-teal-900 md:text-xl md:mb-4'>
              Advanced
            </p>
          </div>
          <ul className='col-span-2 pl-2 text-sm leading-6 text-blue-700'>
            <li>All basic plus ++</li>
            <li>Personalized newsletter</li>
            <li>2x Twitter posts</li>
          </ul>
        </TierSelectCard>

        <TierSelectCard
          value={process.env.REACT_APP_PREMIUM_PLAN}
          receivingTierClick={receivingTierClick}
          tier={tier}
        >
          <div className='col-span-1 text-center'>
            <div className='relative text-5xl font-bold leading-none text-blue-900 md:text-6xl'>
              <span className='absolute mt-4 -ml-4 text-2xl'>$</span>
              175
            </div>
            <p className='-mt-2 text-lg text-teal-900 md:text-xl md:mb-4'>
              Premium
            </p>
          </div>

          <ul className='col-span-2 text-sm leading-6 text-blue-700'>
            <li>All basic &amp; advanced plus ++</li>
            <li>&apos;Why we hire&apos; feature on homepage</li>
          </ul>
        </TierSelectCard>
      </div>
    </div>
  )
}

TierSelect.propTypes = {
  receivingTierClick: PropTypes.func.isRequired,
  tier: PropTypes.string.isRequired,
}

export default TierSelect
