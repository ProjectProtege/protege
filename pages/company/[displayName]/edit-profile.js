// React/Next imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'

// Lib imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import 'react-quill/dist/quill.snow.css'

import { db } from 'utils/db'
import { useAuth } from 'store/AuthContext'
import { useProfileInfo } from 'store/profile_info'

import getText from 'utils/i18n/Texts'

import timezones from 'data/timezones.json'

// Custom component imports
const SimpleFileUpload = dynamic(() => import('react-simple-file-upload'), {
  ssr: false,
})
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const CompanyEditProfile = ({ companyData }) => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const [logo, setLogo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timezonesArray, setTimezonesArray] = useState([])
  const profileInfo = useProfileInfo((s) => s.profileInfo)

  console.log('Profile Info:', profileInfo)
  console.log('Current User:', currentUser)

  const displayName = router.query.displayName

  useEffect(() => {
    setTimezonesArray(timezones)
  })

  const Schema = Yup.object().shape({
    companyName: Yup.string().required('Please enter a company name.'),
    companyWebsite: Yup.string().required('Please enter a company website.'),
    companyEmail: Yup.string().required('Please enter a company email.'),
    companyDescription: Yup.string().required(
      'Please give a brief description of the company and culture.'
    ),
    // companyLogo: Yup.mixed().required(
    //   'Please provide a .png format image of your company logo'
    // ),
    companyTimezone: Yup.string().required('Please select a timezone.'),
    companyHQ: Yup.string().required(
      'Please provide a location for your office headquarters.'
    ),
    companyTimeframeFrom: Yup.string().required(
      'Please select a minimum timezone.'
    ),
    companyTimeframeTo: Yup.string().required(
      'Please select a maximum timezone.'
    ),
  })

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      companyName: displayName,
      companyLogo: profileInfo.companyLogo,
      companyWebsite: profileInfo.companyWebsite,
      companyEmail: currentUser.email ? currentUser.email : '',
      companyDescription: profileInfo.companyDescription,
      companyHQ: profileInfo.companyHQ,
      companyTimeframeFrom: profileInfo.companyTimeframeFrom,
      companyTimeframeTo: profileInfo.companyTimeframeTo,
      companyTimezone: profileInfo.companyTimezone,
    },
  })

  function handleLogoUpload(url) {
    setLogo(url)
  }

  async function handleFormEntry(data) {
    try {
      await db
        .collection('companies')
        .doc(currentUser.uid)
        .update({
          accountType: 'company',
          companyEmail: data.companyEmail,
          companyLogo: logo,
          companyName: data.companyName,
          companyWebsite: data.companyWebsite,
          companyHQ: data.companyHQ,
          companyDescription: data.companyDescription,
          companyTimeframeFrom: data.companyTimeframeFrom,
          companyTimeframeTo: data.companyTimeframeTo,
          companyTimezone: data.companyTimezone,
        })
        .then(router.push(`/company/${displayName}`))
    } catch {
      console.error("Oops! Something went wrong. That's our bad.")
    }
  }

  return (
    <div>
      <form
        className='container relative z-30 p-6 mt-4 bg-white rounded-lg shadow-md md:p-8 lg:mt-16'
        onSubmit={handleSubmit(handleFormEntry)}
      >
        <h2 className='text-2xl'>Profile Info</h2>
        <p className='opacity-75'>
          Fill out your profile information to get started!
        </p>
        <div className='mt-6 mb-3 md:flex'>
          <div className='flex flex-col mb-3 md:w-1/2 md:mr-6 md:mb-0'>
            <label
              htmlFor='companyName'
              className='mb-2 font-semibold text-blue-900'
            >
              Company Name
            </label>

            <input
              id='companyName'
              name='companyName'
              className='input'
              title='name of the company'
              ref={register}
              type='text'
            />

            <p
              name='companyName'
              component='span'
              className='input-error'
              role='alert'
            >
              {errors.companyName && errors.companyName.message}
            </p>
          </div>

          <div className='flex flex-col md:w-1/2'>
            <label
              htmlFor='companyWebsite'
              className='mb-2 font-semibold text-blue-900'
            >
              Company Website
            </label>

            <input
              id='companyWebsite'
              name='companyWebsite'
              className='input'
              title='url of the company'
              type='text'
              ref={register}
              placeholder='https://'
            />

            <p
              name='companyWebsite'
              component='span'
              className='input-error'
              role='alert'
            >
              {errors.companyWebsite && errors.companyWebsite.message}
            </p>
          </div>
        </div>

        <div className='md:flex'>
          <div className='flex flex-col mb-3 md:w-1/2 md:mr-6'>
            <label
              htmlFor='companyEmail'
              className='mb-2 font-semibold text-blue-900'
            >
              Email
            </label>

            <input
              id='companyEmail'
              name='companyEmail'
              className='input'
              type='email'
              ref={register}
            />

            <p
              name='companyEmail'
              component='span'
              className='input-error'
              role='alert'
            >
              {errors.companyEmail && errors.companyEmail.message}
            </p>
          </div>

          <div className='flex flex-col mb-3 md:w-1/2'>
            {/* TODO: Make this work */}
            <label
              htmlFor='companyLogo'
              className='mb-2 font-semibold text-blue-900'
            >
              Logo
            </label>

            <div className='grid-cols-2 gap-4 md:grid'>
              <div className='mb-2 md:mb-0'>
                <SimpleFileUpload
                  apiKey={process.env.SIMPLE_FILE_API_KEY}
                  preview={true}
                  onSuccess={handleLogoUpload}
                  value={logo}
                />
                <a
                  href='https://simplefileupload.com'
                  className='text-blue-400'
                  style={{ fontSize: '10px' }}
                >
                  Powered by:{' '}
                  <span className='underline'>Simple File Upload</span>
                </a>
              </div>

              <span
                data-cy='logo-upload-fileName'
                className='text-xs tracking-tight text-blue-500'
              >
                Please provide a .jpg, .jpeg, or .png format of your company's
                logo to be displayed with your job opening listing.
              </span>
            </div>

            <p
              name='companyLogo'
              component='span'
              className='input-error'
              role='alert'
            >
              {errors.companyLogo && errors.companyLogo.message}
            </p>
          </div>
        </div>

        <div className='flex flex-col mb-3'>
          <label
            htmlFor='companyDescription'
            className='mb-2 font-semibold text-blue-900'
          >
            Company Description
          </label>

          <Controller
            name='companyDescription'
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
            name='companyDescription'
            component='span'
            className='input-error'
            role='alert'
          >
            {errors.companyDescription && errors.companyDescription.message}
          </p>
        </div>

        <div className='mb-6 md:flex'>
          <div className='flex flex-col mb-3 md:w-1/2 md:mr-6'>
            <label
              htmlFor='companyTimezone'
              className='font-semibold text-blue-900'
            >
              Timezone
            </label>

            <span className='mb-2 text-xs tracking-tight text-blue-500 '>
              Where is your company based out of?
            </span>

            <div className='select-wrap'>
              <select
                id='companyTimezone'
                name='companyTimezone'
                ref={register}
                className='input input-select '
              >
                {!profileInfo.companyTimezone && (
                  <option value='' className='text-gray-300'>
                    Select One...
                  </option>
                )}

                {timezonesArray.map((timezone, index) => {
                  return (
                    <option
                      key={index}
                      value={timezone.text}
                      className='text-gray-300'
                    >
                      {timezone.text}
                    </option>
                  )
                })}
              </select>
            </div>

            <p
              name='companyTimezone'
              component='span'
              className='input-error'
              role='alert'
            >
              {errors.companyTimezone && errors.companyTimezone.message}
            </p>
          </div>

          <div className='flex flex-col md:w-1/2'>
            <label htmlFor='companyHQ' className='font-semibold text-blue-900'>
              Company Headquarters
            </label>

            <span className='mb-2 text-xs tracking-tight text-blue-500'>
              These are remote job listings, but where is your main office?
            </span>

            <input
              id='companyHQ'
              name='companyHQ'
              className='input'
              ref={register}
            />

            <p
              name='companyHQ'
              component='span'
              className='input-error'
              role='alert'
            >
              {errors.companyHQ && errors.companyHQ.message}
            </p>
          </div>
        </div>

        <div className='flex flex-col'>
          <div htmlFor='timeframe' className='font-semibold text-blue-900'>
            Timeframe
          </div>

          <span className='mb-2 text-xs tracking-tight text-blue-500 '>
            Where can your candidates be based out of?
          </span>

          <div className='md:flex'>
            <div className='mb-3 md:w-1/2 md:mr-6 md:mb-0'>
              <label
                htmlFor='timezone-from'
                className='font-semibold text-blue-900'
              >
                From
              </label>

              <div className='select-wrap'>
                <select
                  id='timezone-from'
                  name='companyTimeframeFrom'
                  ref={register}
                  className='input input-select '
                >
                  {!profileInfo.companyTimeframeFrom && (
                    <option value='' className='text-gray-300'>
                      Select One...
                    </option>
                  )}

                  {timezonesArray.map((timezone, index) => {
                    return (
                      <option
                        key={index}
                        value={timezone.text}
                        className='text-gray-300'
                      >
                        {timezone.text}
                      </option>
                    )
                  })}
                </select>
              </div>

              <p
                name='companyTimeframeFrom'
                component='span'
                className='input-error'
                role='alert'
              >
                {errors.companyTimeframeFrom &&
                  errors.companyTimeframeFrom.message}
              </p>
            </div>

            <div className='md:w-1/2'>
              <label
                htmlFor='timezone-to'
                className='font-semibold text-blue-900'
              >
                To
              </label>

              <div className='select-wrap'>
                <select
                  id='timezone-to'
                  name='companyTimeframeTo'
                  ref={register}
                  className='input input-select '
                >
                  {!profileInfo.companyTimeframeTo && (
                    <option value='' className='text-gray-300'>
                      Select One...
                    </option>
                  )}

                  {timezonesArray.map((timezone, index) => {
                    return (
                      <option
                        key={index}
                        value={timezone.text}
                        className='text-gray-300'
                      >
                        {timezone.text}
                      </option>
                    )
                  })}
                </select>
              </div>

              <p
                name='companyTimeframeTo'
                component='span'
                className='input-error'
                role='alert'
              >
                {errors.companyTimeframeTo && errors.companyTimeframeTo.message}
              </p>
            </div>
          </div>
        </div>

        <button
          data-cy='next-step-button'
          type='submit'
          className='w-32 mt-12 btn btn-teal'
        >
          Save
        </button>
      </form>
    </div>
  )
}

CompanyEditProfile.propTypes = {
  companyData: PropTypes.shape({
    companyName: PropTypes.string,
    companyWebsite: PropTypes.string,
    companyEmail: PropTypes.string,
    companyLogo: PropTypes.string,
    companyDescription: PropTypes.string,
    companyHQ: PropTypes.string,
    companyTimezone: PropTypes.string,
    companyTimeframeFrom: PropTypes.string,
    companyTimeframeTo: PropTypes.string,
  }),
  timezones: PropTypes.shape({}),
}

CompanyEditProfile.defaultProps = {
  companyData: {
    companyName: '',
    companyWebsite: '',
    companyEmail: '',
    companyLogo: '',
    companyDescription: '',
    companyHQ: '',
    companyTimezone: '',
    companyTimeframeFrom: '',
    companyTimeframeTo: '',
  },
  timezones: {},
}

export default CompanyEditProfile
