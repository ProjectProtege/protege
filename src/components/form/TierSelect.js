import React, { useState } from 'react'
import TierSelectCard from './TierSelectCard'

const TierSelect = () => {
  const [tier, setTier] = useState()

  function receivingClick(e) {
    setTier(e)
    console.log(e)
  }

  return (
    <div>
      <div className='mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6'>
        <TierSelectCard
          value='Basic'
          receivingClick={receivingClick}
          tier={tier}
        >
          <div className='col-span-1 text-center'>
            <div className='relative font-bold leading-none text-blue-500 text-5xl md:text-6xl'>
              <span className='text-2xl absolute mt-4 -ml-4'>$</span>75
            </div>

            <p className='text-teal-700 text-lg md:text-xl -mt-2 md:mb-4'>
              Basic
            </p>
          </div>

          <ul className='text-blue-200 text-sm leading-6 col-span-2 pl-2'>
            <li>Featured on homepage</li>
            <li>Included in bi-weekly newsletter</li>
            <li>Tweet with link to listing</li>
          </ul>
        </TierSelectCard>

        <TierSelectCard
          value='Advanced'
          receivingClick={receivingClick}
          tier={tier}
        >
          <div className='col-span-1 text-center'>
            <div className='relative font-bold leading-none text-blue-500 text-5xl md:text-6xl'>
              <span className='text-2xl absolute mt-4 -ml-4'>$</span>125
            </div>
            <p className='text-teal-700 text-lg md:text-xl -mt-2 md:mb-4'>
              Advanced
            </p>
          </div>
          <ul className='text-blue-200 text-sm leading-6 col-span-2 pl-2'>
            <li>All basic plus ++</li>
            <li>Personalized newsletter</li>
            <li>2x Twitter posts</li>
          </ul>
        </TierSelectCard>

        <TierSelectCard
          value='Premium'
          receivingClick={receivingClick}
          tier={tier}
        >
          <div className='col-span-1 text-center'>
            <div className='relative font-bold leading-none text-blue-500 text-5xl md:text-6xl'>
              <span className='text-2xl absolute mt-4 -ml-4'>$</span>175
            </div>
            <p className='text-teal-700 text-lg md:text-xl -mt-2 md:mb-4'>
              Premium
            </p>
          </div>

          <ul className='text-blue-200 text-sm leading-6 col-span-2'>
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
