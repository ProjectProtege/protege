import React from 'react'
import { Link } from 'react-router-dom'

const JobPostingConfirmation = ({ props }) => {
  return (
    <div className='lg:w-3/5 mx-auto'>
      <h2 className='text-center text-blue-900 font-bold text-2xl'>
        Thank you for posting with Protege.dev!
      </h2>

      <p className='mt-8  text-blue-900'>
        Your job position has been submitted! All of our listings are reviewed
        by a member of the team to ensure they fall within our requirements.
        You’ll receive a notification once it is approved, at which point your
        position will be live on the job board!
      </p>

      <p className='mt-8  text-blue-900'>
        Thank you, again, for choosing to post with{' '}
        <span className='text-teal-600 font-bold'>Protege.dev</span>. We
        strongly believe that companies will have a greater ROI from their hires
        when they have the flexibility to bring someone on whose ambition and
        drive outweigh their experience.
      </p>

      <p className='mt-8  text-blue-900'>
        Don’t believe us? Junior developers built this!
      </p>

      <h3 className='mt-8 text-blue-900 font-bold text-2xl'>Next Steps:</h3>

      <ul className='mt-8 list-inside'>
        <li className='text-blue-900'>
          - If you fill the position and need the listing removed, simply email
          us at{' '}
          <a className='font-bold' href='mailto:protege.dev@gmail.com'>
            protege.dev@gmail.com
          </a>
        </li>

        <li className='mt-2 text-blue-900'>
          - Be sure to announce your new posting on Twitter and tag{' '}
          <a className='font-bold' href='https://twitter.com/devprotege'>
            @DevProtege
          </a>
          ! We’ll tweet about your new listing with us on your behalf as soon as
          it’s live
        </li>

        <li className='mt-2 text-blue-900'>
          - If you need to correct something on your listing, email{' '}
          <a className='font-bold' href='mailto:protege.dev@gmail.com'>
            protege.dev@gmail.com
          </a>{' '}
          with the company name, job title, and the changes needed.
        </li>
      </ul>

      <button className='btn btn-teal mt-12'>
        <Link to='/'>Back to homepage</Link>
      </button>
    </div>
  )
}
export default JobPostingConfirmation
