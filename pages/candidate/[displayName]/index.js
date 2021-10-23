import Image from 'next/image'

import { useProfileInfo } from 'store/profile_info'

import ExternalLink from 'assets/images/icons/external-link'
import Github from 'assets/images/icons/Github'
import DevIcon from 'assets/images/icons/DevIcon'
import Twitter from 'assets/images/icons/Twitter'
import LinkedIn from 'assets/images/icons/LinkedIn'

function trimTimezone(timezone) {
  return timezone.match(/[^(].+(?=\))/gm)
}

const CandidateDashboard = () => {
  const profileInfo = useProfileInfo((s) => s.profileInfo)

  return (
    <div className='container relative z-30 max-w-screen-lg '>
      <div className='grid-cols-12 gap-10 lg:grid mt-0 md:mt-12'>
        <aside className='col-span-3 mb-12 md:mb-0'>
          <div className='relative w-40 h-40 overflow-hidden rounded-full mb-8'>
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

          <div className='mb-8'>
            <p className='font-semibold text-lg mb-4'>
              {profileInfo?.displayName}
            </p>

            {profileInfo?.portfolio && (
              <a
                href={profileInfo?.portfolio}
                className='block opacity-75 hover:opacity-100 mb-5'
              >
                View Portfolio
                <ExternalLink className='w-5 h-5 inline-block -mt-1 ml-2 opacity-75' />
              </a>
            )}

            <a href={`mailto:${profileInfo?.email}`} className='btn btn-teal'>
              Contact Me
            </a>
          </div>

          <div className='mb-8'>
            <div className='mb-6'>
              <p className='opacity-50'>Timezone</p>
              <p>{profileInfo?.timezone}</p>
            </div>

            {profileInfo?.timeframe_from ? (
              <div>
                <p className='opacity-50'>Preference</p>
                <p>
                  {`${trimTimezone(
                    profileInfo?.timeframe_from
                  )} to ${trimTimezone(profileInfo?.timeframe_to)}`}
                </p>
              </div>
            ) : null}
          </div>

          <div className='flex space-x-4'>
            {profileInfo?.social_dev && (
              <a
                href={profileInfo?.social_dev}
                className='opacity-75 hover:opacity-100'
              >
                <DevIcon className='w-6 opacity-75 hover:opacity-100' />
              </a>
            )}

            {profileInfo?.social_github && (
              <a
                href={profileInfo?.social_github}
                className='opacity-75 hover:opacity-100'
              >
                <Github className='w-6 opacity-75 hover:opacity-100' />
              </a>
            )}

            {profileInfo?.social_twitter && (
              <a
                href={profileInfo?.social_twitter}
                className='opacity-75 hover:opacity-100'
              >
                <Twitter className='w-6 opacity-75 hover:opacity-100' />
              </a>
            )}

            {profileInfo?.social_linkedin && (
              <a
                href={profileInfo?.social_linkedin}
                className='opacity-75 hover:opacity-100'
              >
                <LinkedIn className='w-6 opacity-75 hover:opacity-100' />
              </a>
            )}
          </div>
        </aside>
        <section className='col-span-9'>
          <div className='md:grid grid-cols-2 gap-12'>
            {profileInfo?.tech && (
              <div className='mb-6 md:mb-0'>
                <h3 className='text-lg mb-4'>Languages</h3>
                <ul className='list-disc ml-5 text-blue-700'>
                  {profileInfo?.tech.map((item) => (
                    <li>{item.text}</li>
                  ))}
                </ul>
              </div>
            )}

            {profileInfo?.projects && (
              <div>
                <h3 className='text-lg mb-4'>Projects</h3>
                <ul className='list-disc ml-5'>
                  {profileInfo?.projects.map((item) => (
                    <li>
                      <a
                        className='capitalize text-teal-700 underline font-bold'
                        href={item.projectItemUrl}
                      >
                        {item.projectItemName}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className='mt-12'>
            <div className='mb-6'>
              <p className='font-bold text-lg mb-3'>
                Describe a difficult problem you solved recently.
              </p>
              <p>{profileInfo?.question1}</p>
            </div>

            <div className='mb-6'>
              <p className='font-bold text-lg mb-3'>
                What were your first steps when faced with that problem?
              </p>
              <p>{profileInfo?.question2}</p>
            </div>

            <div className='mb-6'>
              <p className='font-bold text-lg mb-3'>
                How did you overcome that problem?
              </p>
              <p>{profileInfo?.question3}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CandidateDashboard
