import React from 'react'


const JobTemplate = ({props}) => {
  const requirements = props.requirements.map((requirement, index) => <li className="mt-2" key={index}>{requirement || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.'}</li>)
  const responsibilities = props.responsibilities.map((responsibility, index) => <li className="mt-2" key={index}>{responsibility || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</li>)
  const benefits = props.benefits.map((benefit, index) => <li className="mt-2" key={index}>{benefit || 'Lorem ipsum dolor sit amet, consectetur.'}</li>)
  return(
  <div className=''>
    {/* Needs Link back to Job List */}
    {/* <a href='#'>Back to Job List </a> */}
    <h1 className='mt-12 text-gray-800 font-bold text-2xl'>{props.positionTitle || 'Position Title'}, {props.company || "Company Name"}</h1>
    <p className='mt-8 text-gray-600 '>
      {props.aboutTheJob || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
      {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
    </p>
    <h2 className='mt-8 text-gray-800 font-bold text-2xl'>Requirements</h2>
      <ul className='list-disc list-inside mt-8 text-gray-600 '>
        {requirements}
      </ul>
    <h3 className='mt-8 text-gray-800 font-bold text-2xl'>Responsibilities</h3>
    <ul className='list-disc list-inside mt-8 text-gray-600 '>
      {responsibilities}
    </ul>
    <h4 className='mt-8 text-gray-800 font-bold text-2xl'>Benefits</h4>
    <ul className='list-disc list-inside mt-8 text-gray-600 '>
      {benefits}
    </ul>
    <button className='mt-8 text-gray-800 bg-teal-500 font-bold px-6'>Apply</button>
  </div>)
}

export default JobTemplate