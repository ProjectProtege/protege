import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../assets/images/protegeFooterLogo.svg'

const JobCard = () => (
  <Link to="/" className="flex mb-6 md:mb-12 px-6 py-4 bg-white shadow-md border-l-4 border-teal-500">
    <div className="hidden md:block rounded-full bg-gray-500 md:w-1/6" style={{width: 75, height: 75}}>
      <img src={Logo} alt="logo" className="opacity-0"/>
    </div>

    <div className="w-full md:w-5/6 flex justify-between md:pl-6">
      <div className="flex flex-col justify-between">
        <p className="text-sm text-blue-300">Company Name</p>
        <h3 className="md:-mt-1 text-blue-500 leading-tight text-lg md:text-2xl font-bold">Junior Frontend Developer</h3>
        <p className="text-teal-700 text-lg">Location</p>
      </div>
      
      <div className="md:text-right flex flex-col justify-between">
        <p className="text-teal-700 md:text-xl">Mar. 24</p>
        <p className="hidden sm:block text-blue-300">Tag, Tag, Tag</p>
      </div>
    </div>
  </Link>
)

export default JobCard