import React from 'react'
import Typewriter from 'typewriter-effect'

const FindYourNext = () => {
  return (
    <div data-cy='find-your-next' className='flex justify-center mt-8'>
      <div className='md:flex items-center'>
        <div className='flex-col text-center text-blue-900 font-bold text-3xl md:text-5xl'>
          Find your next
        </div>

        <div
          className='flex flex-col text-blue-900 text-center text-3xl  ml-2 font-mono'
          style={{ borderBottom: '3px solid #54AF8E', width: 300 }}
        >
          <Typewriter
            options={{
              strings: [
                "10x'er",
                'Opportunity',
                'Blue Chip',
                'Moment',
                'Prospect',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default FindYourNext
