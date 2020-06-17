import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../layouts/Layout'

const Thanks = () => (
  <Layout>
    <div
      className='container mx-auto pt-32 px-2 md:px-0'
      style={{ maxWidth: 680 }}
    >
      <h1 className='text-2xl font-bold text-blue-500 mb-3'>
        Thanks for your comment!
      </h1>

      <p className='text-blue-200 mb-12'>
        We appreciate your input and the team will review it soon.
        <br />
        <br />
        We'll reach out if we have any follow up!
      </p>

      <Link to='/' className='text-teal-700 underline'>
        Return to Homepage
      </Link>
    </div>
  </Layout>
)

export default Thanks
