import React from 'react'
import FindYourNext from '../components/FindYourNext'

const Home = () => (
  <div>
    <FindYourNext />
    <div className='flex justify-center'>
      <div className='mr-8'>  
        <div className='flex max-w-sm flex-col'>
          <div className='m-2 text-right font-bold text-lg tracking-wide'>Developers</div>
          <p className='tracking-wide font-light'>Looking for your next junior developer role? Look no further! Any jobs listed here are geared for those hungry to work and learn.</p>
          <div className='flex justify-end'>
            <button className='w-24 bg-teal-600 mt-3 px-2 text-xs uppercase font-medium'>Find A Job</button>
          </div>
        </div>
      </div>
      <div className='ml-8'>  
        <div className='flex max-w-sm flex-col'>
          <div className='m-2 text-left font-bold text-lg tracking-wide'>Businesses</div>
          <p className='tracking-wide font-light'>Wanting to find your next superstar developer? Post your openings here and fill them with developers overflowing with ambition.</p>
          <button className='w-24 bg-gray-800 mt-3 px-2 text-xs uppercase font-medium text-white'>Post A Job</button>
        </div>
      </div>
    </div>
  </div>
)

export default Home