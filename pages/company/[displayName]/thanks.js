import React, { useEffect } from 'react'
import Link from 'next/link'
import { db } from 'utils/db'
import AccountInteriorLayout from 'layouts/AccountInteriorLayout'
import { useProfileInfo } from 'store/profile_info'

const Thanks = () => {
  const profileInfo = useProfileInfo((s) => s.profileInfo)

  useEffect(() => {
    const jobId = localStorage.getItem('Job ID')

    if (jobId) {
      const docRef = db.collection('jobs').doc(jobId)

      docRef
        .update({
          paid: true,
        })
        .then(() => {
          localStorage.removeItem('Job ID')
        })
    }
  }, [])

  return (
    <AccountInteriorLayout className='mt-12'>
      <div className='container relative z-30 p-6 bg-white rounded-lg shadow-md md:p-8'>
        <div className='max-w-3xl mx-auto'>
          <h2 className='text-2xl text-blue-900'>
            Thank you for posting with Protegé.dev!
          </h2>

          <p className='mt-8 text-blue-900'>
            We strongly believe that companies will have a greater ROI from
            their hires when they have the flexibility to bring someone on whose
            ambition and drive outweigh their experience.
          </p>

          <p className='mt-8 text-blue-900'>
            Don’t believe us? Junior developers built this!
          </p>

          <h3 className='mt-8 text-2xl text-blue-900'>Next Steps:</h3>

          <ul className='mt-4 list-inside'>
            <li className='mt-2 text-blue-900'>
              - Be sure to announce your new posting on Twitter and tag&nbsp;
              <a className='font-bold' href='https://twitter.com/devprotege'>
                @DevProtege
              </a>
              ! We’ll tweet about your new listing with us on your behalf as
              soon as it’s live
            </li>

            <li className='mt-2 text-blue-900'>
              - If you need to correct something on your listing, email&nbsp;
              <a className='font-bold' href='mailto:protege.dev@gmail.com'>
                protege.dev@gmail.com
              </a>
              &nbsp; with the company name, job title, and the changes needed.
            </li>
          </ul>

          <button className='mt-12 btn btn-teal' type='button'>
            <Link href={`/company/${profileInfo.slug}/dashboard`}>
              <a>View Dashboard</a>
            </Link>
          </button>
        </div>
      </div>
    </AccountInteriorLayout>
  )
}

export default Thanks
