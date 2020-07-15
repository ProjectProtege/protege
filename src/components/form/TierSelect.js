import React from 'react'
import TierSelectCard from './TierSelectCard'

const TierSelect = ({ receivingTierClick, tier, tierError }) => {
  return (
    <div>
      <div className='mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6'>
        <TierSelectCard
          value='price_1GuKFPLy9mbkpBNAI6XtSdqT'
          receivingTierClick={receivingTierClick}
          tier={tier}
        >
          <div className='col-span-1 text-center'>
            <div className='relative font-bold leading-none text-blue-900 text-5xl md:text-6xl'>
              <span className='text-2xl absolute mt-4 -ml-4'>$</span>75
            </div>

            <p className='text-teal-700 text-lg md:text-xl -mt-2 md:mb-4'>
              Basic
            </p>
          </div>

          <ul className='text-blue-500 text-sm leading-6 col-span-2 pl-2'>
            <li>Featured on homepage</li>
            <li>Included in bi-weekly newsletter</li>
            <li>Tweet with link to listing</li>
          </ul>
        </TierSelectCard>

        <TierSelectCard
          value='price_1GuKGJLy9mbkpBNAscbNLnvy'
          receivingTierClick={receivingTierClick}
          tier={tier}
        >
          <div className='col-span-1 text-center'>
            <div className='relative font-bold leading-none text-blue-900 text-5xl md:text-6xl'>
              <span className='text-2xl absolute mt-4 -ml-4'>$</span>125
            </div>
            <p className='text-teal-700 text-lg md:text-xl -mt-2 md:mb-4'>
              Advanced
            </p>
          </div>
          <ul className='text-blue-500 text-sm leading-6 col-span-2 pl-2'>
            <li>All basic plus ++</li>
            <li>Personalized newsletter</li>
            <li>2x Twitter posts</li>
          </ul>
        </TierSelectCard>

        <TierSelectCard
          value='price_1GuKGzLy9mbkpBNAdh96CXLs'
          receivingTierClick={receivingTierClick}
          tier={tier}
        >
          <div className='col-span-1 text-center'>
            <div className='relative font-bold leading-none text-blue-900 text-5xl md:text-6xl'>
              <span className='text-2xl absolute mt-4 -ml-4'>$</span>175
            </div>
            <p className='text-teal-700 text-lg md:text-xl -mt-2 md:mb-4'>
              Premium
            </p>
          </div>

          <ul className='text-blue-500 text-sm leading-6 col-span-2'>
            <li>All basic &amp; advanced plus ++</li>
            <li>'Why we hire' feature on homepage</li>
            <li>Podcast shoutout</li>
          </ul>
        </TierSelectCard>
      </div>
    </div>
  )
}

export default TierSelect
