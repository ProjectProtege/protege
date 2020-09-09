import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import { v4 as uuidv4 } from 'uuid'

//components
import Layout from '../layouts/Layout'
import PostAJobForm from '../components/form/PostAJobForm'
import StatusBar from '../components/form/StatusBar'
import JobTemplate from '../components/JobTemplate'
import JobPostingConfirmation from '../components/JobPostingConfirmation'
import TierSelect from '../components/form/TierSelect'
import Check from '../assets/images/svg/check-solid.js'
import BackArrow from '../assets/images/svg/back-arrow'

//firebase
import { db, storage } from '../firebase/firebase'
import firebase from 'firebase/app'

const PostAJob = ({ location }) => {
  const tierQueryParam = findParam('t')
    ? findParam('t').split('=')[1]
    : process.env.REACT_APP_ADVANCED_PLAN

  let history = useHistory()

  const [status, setStatus] = useState()

  const [jobData, setJobData] = useState()

  const [companyLogo, setcompanyLogo] = useState(undefined)

  const [tier, setTier] = useState(tierQueryParam)

  const statusQueryParam = findParam('s')
    ? parseInt(findParam('s').split('=')[1])
    : 1

  const initialStatusValue = statusQueryParam

  function findParam(letter) {
    return location.search
      .replace('?', '')
      .split('&')
      .find((qs) => qs[0] === letter)
  }

  useEffect(() => {
    setStatus(initialStatusValue)
  }, [initialStatusValue])

  function receivingTierClick(e) {
    setTier(e)
  }

  function receivingJobData(e) {
    setJobData(e)
    history.push('/post-a-job?s=2')
  }

  function recievingLogo2(logo) {
    setcompanyLogo(logo)
  }

  async function sendJobToDB(data) {
    const logoFileName = `${new Date().getTime()}${data.companyLogo.name}`

    const postDate = firebase.firestore.Timestamp.fromDate(new Date())

    const uploadTask = storage.ref(`images/${logoFileName}`).put(companyLogo)

    const uid = uuidv4()

    uploadTask
      .then(
        await db.collection('jobs').doc(uid).set({
          approved: false,
        status: 'active',
          companyEmail: data.jobData.companyEmail,
          companyLogo: logoFileName,
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
          tier: tier,
        })
      )
      .then(localStorage.setItem('Job ID', uid))
  }

  const handlePaymentClick = async (e) => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_API_KEY)

    sendJobToDB({ jobData, companyLogo })

    const { error } = await stripe
      .redirectToCheckout({
        lineItems: [{ price: tier, quantity: 1 }],
        mode: 'payment',
        successUrl: `${process.env.REACT_APP_BASE_URL}/post-a-job?s=3`,
        cancelUrl: `${process.env.REACT_APP_BASE_URL}/post-a-job?s=1`,
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
    <Layout>
      <motion.div
        className='container mx-auto mt-24 md:mt-32 p-2'
        animate={{
          opacity: [0, 1],
          y: [-10, 1],
        }}
        transition={{
          delay: 0.15,
          duration: 0.3,
          ease: 'easeIn',
        }}
      >
        {status === 1 && (
          <>
            <div className='container mx-auto lg:w-4/5 xl:w-7/12 mb-12 flex flex-col items-center'>
              <h3 className='text-xl font-bold text-blue-900 mb-3'>
                What qualifies as a junior remote job opportunity on Protegé?
              </h3>

              <p className='text-blue-700 text-sm lg:text-base lg:leading-relaxed mb-4 lg:text-center'>
                Our mission is to help those early in their tech career find
                their next opporunities to thrive. Below is a list we've
                provided to help you determine if the role you're hiring for
                fits within our requirements here at Protegé.
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

              <p className='text-xs text-blue-600 lg:text-center lg:w-3/4 xl:w-full opacity-75'>
                Protegé.dev is a curated job board tailored towards junior
                developers. Each listing is reviewed, and approved or denied
                before going live. If your listing is denied, we'll contact you
                through email with suggested edits.
              </p>
            </div>

            <TierSelect receivingTierClick={receivingTierClick} tier={tier} />

            <p className={`text-center mb-2 text-blue-400 tracking-wide`}>
              Select Your Tier
            </p>
          </>
        )}

        {status !== 1 && (
          <h1 className='text-lg md:text-2xl text-blue-500 font-bold text-center leading-snug'>
            Inexperienced doesn’t mean incapable. <br />
            Fill your role with ambition.
          </h1>
        )}

        <StatusBar props={status} />

        {status === 1 && !jobData && (
          <motion.div
            animate={{
              opacity: [0, 1],
              y: [-5, 0],
            }}
            transition={{
              delay: 0.25,
              duration: 0.25,
              ease: 'easeIn',
            }}
          >
            <PostAJobForm
              recievingLogo2={recievingLogo2}
              receivingJobData={receivingJobData}
            />
          </motion.div>
        )}

        {status === 1 && jobData && (
          <PostAJobForm
            recievingLogo2={recievingLogo2}
            receivingJobData={receivingJobData}
            jobData={jobData}
          />
        )}

        {status === 2 && jobData && (
          <>
            <div className='container mx-auto lg:w-3/5'>
              <button
                data-cy='edit-job-button'
                className='flex items-center mb-3 text-teal-600 text-lg font-bold'
                onClick={(e) => {
                  history.push('/post-a-job?s=1')
                }}
              >
                <BackArrow />
                Edit
              </button>
              <JobTemplate props={jobData} logo={companyLogo} />
              <button
                data-cy='job-posting-approval-button'
                className='btn btn-blue mt-8'
                onClick={handlePaymentClick}
              >
                Proceed to Payment
              </button>
            </div>
          </>
        )}

        {status === 3 && <JobPostingConfirmation />}
      </motion.div>
    </Layout>
  )
}

export default PostAJob
