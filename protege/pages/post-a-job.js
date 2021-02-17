/* eslint-disable no-console */
/* eslint-disable no-alert */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useJobForm } from 'store/job-post_store'
import PropTypes from 'prop-types'
import { loadStripe } from '@stripe/stripe-js'
import firebase from 'firebase/app'
import { db, storage } from 'utils/db'
import { v4 as uuidv4 } from 'uuid'

import TierSelect from 'components/form/TierSelect'
import StatusBar from 'components/form/StatusBar'
import PostAJobForm from 'components/form/PostAJobForm'
import JobTemplate from 'components/job/JobTemplate'
import JobPostingConfirmation from 'components/job/JobPostingConfirmation'
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
  const tier = useJobForm((s) => s.tier)

  useEffect(() => {
    // eslint-disable-next-line radix
    const queryStatus = parseInt(query.status)
    if (!Number.isNaN(queryStatus)) {
      setStatus(queryStatus)
    }
  }, [query])

  async function sendJobtoDB(data) {
    // const logoFileName = `${new Date().getTime()}-${data.companyLogoFile.name}`

    const postDate = firebase.firestore.Timestamp.fromDate(new Date())

    // const uploadTask = storage
    //   .ref(`images/${logoFileName}`)
    //   .put(companyLogoFile)

    const uid = uuidv4()

    // uploadTask.then(
    await db
      .collection('jobs')
      .doc(uid)
      .set({
        approved: false,
        status: 'active',
        companyEmail: data.jobData.companyEmail,
        companyLogo: data.jobData.companyLogo,
        companyName: data.jobData.companyName,
        companyWebsite: data.jobData.companyWebsite,
        companyHQ: data.jobData.companyHQ,
        companyDescription: data.jobData.companyDescription,
        howToApply: data.jobData.howToApply,
        jobDescription: data.jobData.jobDescription,
        jobtitle: data.jobData.jobtitle,
        paid: false,
        positionType: data.jobData.positionType,
        postedAt: postDate,
        roleFocus: data.jobData.roleFocus,
        tier,
      })
      .then(localStorage.setItem('Job ID', uid))
  }

  const handlePaymentClick = async () => {
    const stripe = await loadStripe(process.env.STRIPE_API_KEY)

    sendJobtoDB({ jobData, companyLogoFile })

    const { error } = await stripe
      .redirectToCheckout({
        lineItems: [{ price: tier, quantity: 1 }],
        mode: 'payment',
        successUrl: `${process.env.BASE_URL}/post-a-job?status=3`,
        cancelUrl: `${process.env.BASE_URL}/post-a-job?status=1`,
      })
      .then(function result() {
        if (error) {
          alert(result.error.message)
        } else {
          console.log('success')
        }
      })
  }

  return (
    <div className='container'>
      {status === 1 && (
        <>
          <div className='container lg:w-4/5 xl:w-7/12 mb-12 flex flex-col items-center'>
            <h1 className='sr-only'>Post a Job</h1>

            <p className='text-xs text-blue-900 lg:text-center lg:w-3/4  opacity-75'>
              Protegé.dev is a curated job board tailored towards junior
              developers. Each listing is reviewed, and approved or denied
              before going live. If your listing is denied, we&apos;ll contact
              you with suggested edits.
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

      {status === 3 && <JobPostingConfirmation />}
    </div>
  )
}

PostAJob.propTypes = {
  query: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
}

export default PostAJob
