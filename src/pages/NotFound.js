import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div
    className='container mx-auto pt-32 px-2 md:px-0'
    style={{ maxWidth: 680 }}
  >
    <h1 className='text-2xl font-bold text-blue-500 mb-3'>
      Oops, we didn&apos;t find that page!
    </h1>

    <Link to='/' className='text-teal-700 underline'>
      Return to Homepage
    </Link>
  </div>
)

export default NotFound
