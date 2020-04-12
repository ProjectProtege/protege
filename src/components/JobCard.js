import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../assets/images/protegeFooterLogo.svg'

const JobCard = ({job}) => (
  <Link to="/" className="flex mb-6 md:mb-12 px-3 md:px-6 py-4 bg-white shadow-md border-l-4 border-teal-500">
    <div className="hidden md:block rounded-full bg-gray-500 md:w-1/6" style={{width: 75, height: 75}}>
      <img src={Logo} alt="logo" className="opacity-0"/>
    </div>

    <div className="w-full md:w-11/12 flex justify-between md:pl-6">
      <div className="flex flex-col justify-between">
        <p className="text-sm text-blue-300">{job.companyName}</p>
        <h3 className="md:-mt-1 text-blue-500 leading-tight text-lg md:text-2xl font-bold">{job.positionTitle}</h3>
        <p className="text-teal-700">{job.focus}</p>
      </div>
      
      <div className="text-right flex flex-col justify-between">
        <p className="text-blue-100">{job.postDate}</p>
        <p className="text-blue-100 text-sm">{job.location}</p>
      </div>
    </div>
  </Link>
)

export default JobCard