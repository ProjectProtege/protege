import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

// Lib imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import 'react-quill/dist/quill.snow.css'

// Component imports
import AccountInteriorLayout from 'layouts/AccountInteriorLayout'
import TierSelect from 'components/form/TierSelect'
import { loadStripe } from '@stripe/stripe-js'
import firebase from 'firebase/app'
import { db } from 'utils/db'
import { v4 as uuidv4 } from 'uuid'

// Zustand imports
import { useJobForm } from 'store/job-post_store'
import { useProfileInfo } from 'store/profile_info'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const PostAJob = () => {
  const router = useRouter()

  // Form and Status state from zustand
  const tier = useJobForm((s) => s.tier)
  const profileInfo = useProfileInfo((s) => s.profileInfo)

  const { displayName } = router.query

  const Schema = Yup.object().shape({
    jobtitle: Yup.string().required('Job title is a required field.'),
    roleFocus: Yup.string().required('Please select a focus area.'),
    positionType: Yup.string().required('Please select a position type.'),
    jobDescription: Yup.string().required(
      'Please give a description of the job and responsibilities.'
    ),
  })

  // react-hook-form
  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      jobtitle: '',
      roleFocus: '',
      positionType: '',
      jobDescription: '',
    },
  })

  async function sendJobtoDB(data) {
    const postDate = firebase.firestore.Timestamp.fromDate(new Date())

    const userUid = uuidv4()

    await db
      .collection('jobs')
      .doc(userUid)
      .set({
        approved: true,
        status: 'active',
        userUid: profileInfo.userUid,
        companyEmail: profileInfo.email,
        companyLogo: profileInfo.avatar,
        companyName: profileInfo.companyName,
        companyWebsite: profileInfo.companyWebsite,
        companyHQ: profileInfo.companyHQ,
        companyDescription: profileInfo.companyDescription,
        jobDescription: data.jobDescription,
        jobtitle: data.jobtitle,
        paid: false,
        positionType: data.positionType,
        postedAt: postDate,
        roleFocus: data.roleFocus,
        tier,
      })
      .then(localStorage.setItem('Job ID', userUid))
  }

  const handleFormEntry = async (data) => {
    const stripe = await loadStripe(process.env.STRIPE_API_KEY)

    await sendJobtoDB(data)

    await stripe.redirectToCheckout({
      lineItems: [{ price: tier, quantity: 1 }],
      mode: 'payment',
      successUrl: `${process.env.BASE_URL}/company/${displayName}/dashboard`,
      cancelUrl: `${process.env.BASE_URL}/company/${displayName}/post-a-job`,
    })
  }

  return (
    <AccountInteriorLayout className='mt-12'>
      <section>
        <h1 className='sr-only'>Post a Job</h1>

        <div className='container relative z-30 p-6 bg-white rounded-lg shadow-md md:p-8'>
          <TierSelect />

          <p className='mb-2 tracking-wide text-center text-teal-900'>
            Select Your Tier
          </p>

          <form className='mt-12' onSubmit={handleSubmit(handleFormEntry)}>
            <h2 className='text-xl text-blue-900 mb-4'>About the Job</h2>

            <div className='flex flex-col mb-3'>
              <label
                htmlFor='job-title'
                className='mb-2 font-semibold text-blue-900'
              >
                Job Title
              </label>

              <input
                id='jobTitle'
                name='jobtitle'
                ref={register}
                className='input'
                type='text'
                autoComplete='off'
              />

              <p
                name='jobtitle'
                component='span'
                className='input-error'
                role='alert'
              >
                {errors.jobtitle && errors.jobtitle.message}
              </p>
            </div>

            <div className='md:flex'>
              <div className='flex flex-col mb-3 md:w-1/2 md:mr-6'>
                <label
                  htmlFor='role-focus'
                  className='font-semibold text-blue-900'
                >
                  Role Focus
                </label>

                <span className='mb-2 text-xs tracking-tight text-blue-500 '>
                  Frontend, Backend, Full-Stack
                </span>

                <div className='select-wrap'>
                  <select
                    id='role-focus'
                    name='roleFocus'
                    ref={register}
                    className='input input-select '
                  >
                    <option value='' className='text-gray-300'>
                      Select One...
                    </option>

                    <option value='Front-end'>Front-end</option>

                    <option value='Back-end'>Back-end</option>

                    <option value='Full-stack'>Full-Stack</option>
                  </select>
                </div>

                <p
                  name='roleFocus'
                  component='span'
                  className='input-error'
                  role='alert'
                >
                  {errors.roleFocus && errors.roleFocus.message}
                </p>
              </div>

              <div className='flex flex-col mb-3 md:w-1/2'>
                <label
                  htmlFor='position-type'
                  className='font-semibold text-blue-900'
                >
                  Position Type
                </label>

                <span className='mb-2 text-xs tracking-tight text-blue-500 '>
                  Full-time, Part-time, or Contract?
                </span>

                <div className='select-wrap'>
                  <select
                    id='position-type'
                    name='positionType'
                    className='input input-select '
                    ref={register}
                  >
                    <option value='' className='text-gray-300'>
                      Select One...
                    </option>
                    <option value='Full-time'>Full-time</option>
                    <option value='Part-time'>Part-time</option>
                    <option value='Contract'>contract</option>
                  </select>
                </div>

                <p
                  name='positionType'
                  component='span'
                  className='input-error'
                  role='alert'
                >
                  {errors.positionType && errors.positionType.message}
                </p>
              </div>
            </div>

            <div className='flex flex-col mb-3'>
              <label
                htmlFor='job-description'
                className='mb-2 font-semibold text-blue-900'
              >
                Job Description
              </label>

              <Controller
                name='jobDescription'
                control={control}
                render={({ value, onChange }) => (
                  <ReactQuill
                    value={value}
                    onChange={onChange}
                    modules={{ keyboard: { bindings: { tab: false } } }}
                  />
                )}
              />

              <p
                name='jobDescription'
                component='span'
                className='input-error'
                role='alert'
              >
                {errors.jobDescription && errors.jobDescription.message}
              </p>
            </div>

            <button type='submit' className='btn btn-teal'>
              Proceed to Payment
            </button>
          </form>
        </div>
      </section>
    </AccountInteriorLayout>
  )
}

export default PostAJob
