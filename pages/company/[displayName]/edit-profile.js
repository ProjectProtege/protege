// React/Next imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

// Lib imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import nookies from 'nookies'
import { verifyIdToken } from 'utils/db/firebaseAdmin'
import * as Yup from 'yup'
import 'react-quill/dist/quill.snow.css'

import { db } from 'utils/db'
import { useAuth } from 'store/AuthContext'
import { useProfileInfo } from 'store/profile_info'
import AccountInteriorLayout from 'layouts/AccountInteriorLayout'

import getText from 'utils/i18n/Texts'

import timezones from 'data/timezones.json'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const CompanyEditProfile = ({ session }) => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const [error, setError] = useState(null)
  const [timezonesArray, setTimezonesArray] = useState([])
  const profileInfo = useProfileInfo((s) => s.profileInfo)
  const setProfileInfo = useProfileInfo((s) => s.setProfileInfo)

  useEffect(() => {
    setTimezonesArray(timezones)
  }, [])

  const Schema = Yup.object().shape({
    companyName: Yup.string().required('Please enter a company name.'),
    companyWebsite: Yup.string(),
    companyEmail: Yup.string(),
    companyDescription: Yup.string().required(
      'Please give a brief description of the company and culture.'
    ),
    // avatar: Yup.mixed().required(
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
      companyName: currentUser.displayName,
      companyWebsite: profileInfo?.companyWebsite
        ? profileInfo.companyWebsite
        : '',
      companyEmail: currentUser.email,
      companyDescription: profileInfo?.companyDescription
        ? profileInfo.companyDescription
        : '',
      companyHQ: profileInfo?.companyHQ ? profileInfo.companyHQ : '',
      companyTimeframeFrom: profileInfo?.companyTimeframeFrom
        ? profileInfo.companyTimeframeFrom
        : '',
      companyTimeframeTo: profileInfo?.companyTimeframeTo
        ? profileInfo.companyTimeframeTo
        : '',
      companyTimezone: profileInfo?.companyTimezone
        ? profileInfo.companyTimezone
        : '',
    },
  })

  async function handleFormEntry(data) {
    try {
      await db.collection('companies').doc(currentUser.userUid).update({
        accountType: 'company',
        companyEmail: data.companyEmail,
        companyName: data.companyName,
        companyWebsite: data.companyWebsite,
        companyHQ: data.companyHQ,
        companyDescription: data.companyDescription,
        companyTimeframeFrom: data.companyTimeframeFrom,
        companyTimeframeTo: data.companyTimeframeTo,
        companyTimezone: data.companyTimezone,
      })

      setProfileInfo({
        ...profileInfo,
        ...data,
      })

      router.push(`/company/${profileInfo.slug}/dashboard`)
    } catch {
      setError('Oops! Something went wrong on our end. Please try again later.')
    }
  }

  if (session) {
    return (
      <AccountInteriorLayout className='mt-12'>
        <form
          className='container relative z-30 p-6 bg-white rounded-lg shadow-md md:p-8'
          onSubmit={handleSubmit(handleFormEntry)}
        >
          <h1 className='text-2xl'>{getText('GLOBAL', 'PROFILE_INFO')}</h1>
          <p className='opacity-75'>{getText('GLOBAL', 'FILL_OUT')}</p>
          <div className='mt-6 mb-3 md:grid grid-cols-2 gap-6'>
            <div className='flex flex-col mb-3 md:mb-0'>
              <label
                htmlFor='companyName'
                className='mb-2 font-semibold text-blue-900'
              >
                {getText('GLOBAL', 'COMPANY_NAME')}{' '}
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

            <div className='flex flex-col'>
              <label
                htmlFor='companyWebsite'
                className='mb-2 font-semibold text-blue-900'
              >
                {getText('GLOBAL', 'COMPANY_WEBSITE')}
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

          <div className='md:grid grid-cols-2 gap-6'>
            <div className='flex flex-col mb-12 '>
              <label
                htmlFor='companyEmail'
                className='mb-2 font-semibold text-blue-900'
              >
                {getText('GLOBAL', 'EMAIL')}
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
          </div>

          <div className='flex flex-col mb-12'>
            <label
              htmlFor='companyDescription'
              className='mb-2 font-semibold text-blue-900'
            >
              {getText('GLOBAL', 'COMPANY_DESCRIPTION')}
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

          <div className='mb-6 md:grid grid-cols-2 gap-6'>
            <div className='flex flex-col'>
              <label
                htmlFor='companyHQ'
                className='font-semibold text-blue-900'
              >
                {getText('GLOBAL', 'COMPANY_HQ')}
              </label>

              <span className='mb-2 text-xs tracking-tight text-blue-500'>
                {getText('GLOBAL', 'COMPANY_HQ_DESC')}
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
            <div className='flex flex-col mb-3 '>
              <label
                htmlFor='companyTimezone'
                className='font-semibold text-blue-900'
              >
                {getText('GLOBAL', 'TIMEZONE')}
              </label>

              <span className='mb-2 text-xs tracking-tight text-blue-500 '>
                {getText('GLOBAL', 'TIMEZONE_DESC')}
              </span>

              <div className='select-wrap'>
                <select
                  id='companyTimezone'
                  name='companyTimezone'
                  ref={register}
                  className='input input-select '
                >
                  {!profileInfo?.companyTimezone ? (
                    <option value='' className='text-gray-300'>
                      {getText('GLOBAL', 'SELECT_ONE')}
                    </option>
                  ) : (
                    ''
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
          </div>

          <div className='flex flex-col'>
            <div htmlFor='timeframe' className='font-semibold text-blue-900'>
              {getText('GLOBAL', 'TIMEFRAME')}
            </div>

            <span className='mb-2 text-xs tracking-tight text-blue-500 '>
              {getText('GLOBAL', 'TIMEZONE_WITHIN')}
            </span>

            <div className='md:grid grid-cols-2 gap-6'>
              <div className='mb-3  md:mb-0'>
                <label
                  htmlFor='timezone-from'
                  className='font-semibold text-blue-900'
                >
                  {getText('GLOBAL', 'FROM')}
                </label>

                <div className='select-wrap'>
                  <select
                    id='timezone-from'
                    name='companyTimeframeFrom'
                    ref={register}
                    className='input input-select '
                  >
                    {!profileInfo?.companyTimeframeFrom ? (
                      <option value='' className='text-gray-300'>
                        {getText('GLOBAL', 'SELECT_ONE')}
                      </option>
                    ) : (
                      ''
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

              <div>
                <label
                  htmlFor='timezone-to'
                  className='font-semibold text-blue-900'
                >
                  {getText('GLOBAL', 'TO')}
                </label>

                <div className='select-wrap'>
                  <select
                    id='timezone-to'
                    name='companyTimeframeTo'
                    ref={register}
                    className='input input-select '
                  >
                    {!profileInfo?.companyTimeframeTo ? (
                      <option value='' className='text-gray-300'>
                        {getText('GLOBAL', 'SELECT_ONE')}
                      </option>
                    ) : (
                      ''
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
                  {errors.companyTimeframeTo &&
                    errors.companyTimeframeTo.message}
                </p>
              </div>
            </div>
          </div>

          <button
            data-cy='next-step-button'
            type='submit'
            className='w-32 mt-12 btn btn-teal'
          >
            {getText('GLOBAL', 'SAVE')}
          </button>

          {error ? (
            <p className='p-3 mt-6 text-lg text-center text-red-500 bg-red-100 rounded-md'>
              {error}
            </p>
          ) : null}
        </form>
      </AccountInteriorLayout>
    )
  }
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)

    return {
      props: {
        session: { ...token },
      },
    }
  } catch (err) {
    context.res.writeHead(302, { location: '/sign-in' })
    context.res.end()
    return { props: [] }
  }
}

export default CompanyEditProfile
