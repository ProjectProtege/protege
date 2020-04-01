import React from 'react'
import FindYourNext from '../components/FindYourNext'
import JobCard from '../components/JobCard'

const Home = () => (
  <div className="container mx-auto">
    <FindYourNext />
    <div className='flex md:w-3/4 flex-col text-center mx-auto mt-6'>
      <p className='tracking-wide font-light md:w-3/4 mx-auto text-lg text-blue-400 mb-6'>Looking for your next junior developer role? Look no further! Any jobs listed here are geared for those hungry to work and learn.</p>
      <button className='btn btn-teal mx-auto text-xl'>Find A Job</button>
    </div>

    <div className="my-24 mx-auto px-3" style={{maxWidth: 680}}>
      <h2 className="text-center text-2xl text-blue-500 font-bold mb-10">
        Latest Opportunities
      </h2>

      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
    </div>
  </div>
)

export default Home