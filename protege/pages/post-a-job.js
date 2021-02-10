import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useJobForm } from 'store/job-post_store'
import PropTypes from 'prop-types'

import Check from 'assets/images/icons/check-solid'
import TierSelect from 'components/form/TierSelect'
import StatusBar from 'components/form/StatusBar'
import PostAJobForm from 'components/form/PostAJobForm'
import JobTemplate from 'components/job/JobTemplate'
import BackArrow from 'assets/images/icons/back-arrow'

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query,
    },
  }
}

const PostAJob = ({ query }) => {
  const router = useRouter()

  const status = useJobForm((s) => s.status)
  const setStatus = useJobForm((s) => s.setStatus)
  const jobData = useJobForm((s) => s.form)
  const companyLogoFile = useJobForm((s) => s.companyLogoFile)

  useEffect(() => {
    // eslint-disable-next-line radix
    const queryStatus = parseInt(query.status)
    if (!Number.isNaN(queryStatus)) {
      setStatus(queryStatus)
    }
  }, [query])

  function handlePaymentClick() {
    console.log('bazinga')
  }

  return (
    <div className='container'>
      {status === 1 && (
        <>
          <div className='container lg:w-4/5 xl:w-7/12 mb-12 flex flex-col items-center'>
            <h1 className='mb-3 text-2xl font-semibold text-blue-900'>
              Post a Job
            </h1>
            <h2 className='text-xl font-bold text-blue-900 mb-3'>
              What qualifies as a junior remote job opportunity on Protegé?
            </h2>

            <p className='text-blue-700 text-sm lg:text-base lg:leading-relaxed mb-4 lg:text-center'>
              Our mission is to help those early in their tech career find their
              next opporunities to thrive. Below is a list we&apos;ve provided
              to help you determine if the role you&apos;re hiring for fits
              within our requirements here at Protegé.
            </p>

            <ul className='leading-loose text-blue-800 mb-4 text-sm lg:text-base'>
              <li>
                <span className='text-teal-600 absolute w-5 h-5 lg:mt-1'>
                  <Check />
                </span>
                <p className='pl-8 lg:pl-10'>The job must be fully remote.</p>
              </li>
              <li>
                <span className='text-teal-600 absolute w-5 h-5 lg:mt-1'>
                  <Check />
                </span>
                <p className='pl-8 lg:pl-10'>
                  Do not require 3 (or more) years experience.
                </p>
              </li>
              <li>
                <span className='text-teal-600 absolute w-5 h-5 lg:mt-1'>
                  <Check />
                </span>
                <p className='pl-8 lg:pl-10'>
                  Do not require a 4 year degree (or equivalent experience).
                </p>
              </li>
            </ul>

            <p className='text-xs text-blue-900 lg:text-center lg:w-3/4 xl:w-full opacity-75'>
              Protegé.dev is a curated job board tailored towards junior
              developers. Each listing is reviewed, and approved or denied
              before going live. If your listing is denied, we&apos;ll contact
              you through email with suggested edits.
            </p>
          </div>

          <TierSelect />

          <p className='text-center mb-2 text-teal-900 tracking-wide'>
            Select Your Tier
          </p>
        </>
      )}

      {status !== 1 && (
        <h2 className='text-lg md:text-2xl text-blue-500 font-bold text-center leading-snug'>
          Inexperienced doesn’t mean incapable.
          <br />
          Fill your role with ambition.
        </h2>
      )}

      <StatusBar props={status} />

      {status === 1 && Object.keys(jobData).length && (
        <div>
          <PostAJobForm jobData={jobData} />
        </div>
      )}

      {status === 2 && jobData && (
        <>
          <div className='container mx-auto lg:w-3/5'>
            <button
              data-cy='edit-job-button'
              className='flex items-center mb-3 text-teal-600 text-lg font-bold'
              onClick={() => {
                router.push('/post-a-job?status=1')
              }}
              type='button'
            >
              <BackArrow />
              <span className='pl-2 font-medium'>Edit</span>
            </button>

            <JobTemplate props={jobData} logo={companyLogoFile} />

            <button
              data-cy='job-posting-approval-button'
              className='btn btn-blue mt-8'
              onClick={handlePaymentClick}
              type='button'
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  )
}

PostAJob.propTypes = {
  query: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
}

export default PostAJob
