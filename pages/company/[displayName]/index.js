/* eslint-disable react/no-danger */
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from 'store/AuthContext'
import { db } from 'utils/db'
import { useProfileInfo } from 'store/profile_info'
import ExternalLink from 'assets/images/icons/external-link'

function trimTimezone(timezone) {
  return timezone.match(/[^(].+(?=\))/gm)
}

function createMarkup(text) {
  return { __html: text }
}

const CompanyProfile = () => {
  const profileInfo = useProfileInfo((s) => s.profileInfo)
  const postedJobs = useProfileInfo((s) => s.postedJobs)
  const setPostedJobs = useProfileInfo((s) => s.setPostedJobs)
  const { currentUser } = useAuth()
  const [activeJobs, setActiveJobs] = useState([])

  useEffect(() => {
    const active = postedJobs.filter((job) => {
      return (
        job.status !== 'inactive' && job.paid === true && job.approved === true
      )
    })

    setActiveJobs(active)
  }, [])

  useEffect(async () => {
    const userJobs = await db
      .collection('jobs')
      .where('userUid', '==', currentUser.userUid)
      .get()

    const userJobsData = userJobs.docs.map((documentSnapshot) => {
      const entry = documentSnapshot.data()
      const doc = documentSnapshot

      return {
        id: doc.id,
        jobtitle: entry.jobtitle,
        positionType: entry.positionType,
      }
    })

    if (userJobsData) {
      setPostedJobs(userJobsData)
    }
  }, [])

  return (
    <div className='container relative z-30 max-w-screen-lg  '>
      <div className='grid-cols-12 gap-10 lg:grid mt-12'>
        <aside className='col-span-3'>
          <div className='bg-white rounded-md py-8 px-6 shadow'>
            <div className='relative w-32 h-32 overflow-hidden rounded-full mb-8'>
              {profileInfo?.avatar ? (
                <Image
                  src={profileInfo?.avatar}
                  layout='fill'
                  objectFit='cover'
                />
              ) : (
                <div className='text-gray-400'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-32 h-32 scale-110 transform'
                  >
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              )}
            </div>

            <div>
              <p className='font-bold text-lg mb-2'>
                {profileInfo?.companyName}
              </p>

              <a
                className='opacity-75 underline hover:opacity-100 cursor-pointer'
                href={profileInfo?.companyWebsite}
              >
                {profileInfo?.companyWebsite}
                <ExternalLink className='w-5 h-5 inline-block -mt-1 ml-2 opacity-75 text-teal-700' />
              </a>

              <div className='mt-4 text-sm'>
                <p className='opacity-50'>Timezone</p>
                <p>{profileInfo?.companyTimezone}</p>
              </div>

              <div className='mt-4 text-sm'>
                <p className='opacity-50'>Timezone Preference</p>
                {profileInfo?.companyTimeframeFrom && (
                  <p>{`${trimTimezone(
                    profileInfo?.companyTimeframeFrom
                  )} - ${trimTimezone(profileInfo?.companyTimeframeTo)}`}</p>
                )}
              </div>
            </div>
          </div>
        </aside>

        <div className='col-span-9 mt-32'>
          <article className='mb-12'>
            <h2 className='text-2xl mb-6'>About {profileInfo?.companyName}</h2>

            <div
              className='opacity-75'
              dangerouslySetInnerHTML={createMarkup(
                profileInfo?.companyDescription
              )}
            />
          </article>

          <div>
            <h2 className='text-2xl mb-6'>Active Jobs</h2>

            <ul>
              {activeJobs.length ? (
                activeJobs.map((job) => (
                  <li className='mb-4'>
                    <Link href={`/job-board/${job.id}`}>
                      <a className='relative flex justify-between bg-white p-3 pr-4 rounded-md overflow-hidden shadow-md'>
                        <div className='absolute left-0 top-0 w-1 h-full bg-gradient-to-t from-teal-500 to-teal-300' />
                        <p className='font-semibold'>{job.jobtitle}</p>
                        <p className='opacity-50'>{job.positionType}</p>
                      </a>
                    </Link>
                  </li>
                ))
              ) : (
                <p>No Active Jobs</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyProfile
