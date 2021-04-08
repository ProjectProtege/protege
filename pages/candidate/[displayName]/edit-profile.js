// React/Next imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

// Lib Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { db } from 'utils/db'
import { useAuth } from 'store/AuthContext'
import { useProfileInfo } from 'store/profile_info'
import AccountInteriorLayout from 'layouts/AccountInteriorLayout'

import getText from 'utils/i18n/Texts'

import timezones from 'data/timezones.json'

const CandidateEditProfile = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timezonesArray, setTimezonesArray] = useState([])
  const profileInfo = useProfileInfo((s) => s.profileInfo || {})

  const { displayName } = router.query

  useEffect(() => {
    setTimezonesArray(timezones)
  }, [])

  const Schema = yup.object().shape({
    firstName: yup.string().required(getText('GLOBAL', 'FIRST_NAME_REQUIRED')),
    lastName: yup.string().required(getText('GLOBAL', 'LAST_NAME_REQUIRED')),
    email: yup
      .string()
      .email(getText('GLOBAL', 'EMAIL_VALID'))
      .required(getText('GLOBAL', 'EMAIL_REQUIRED')),
    timezone: yup.string().required(getText('GLOBAL', 'TIMEZONE_REQUIRED')),
    timeframe_from: yup
      .string()
      .required(getText('GLOBAL', 'TIMEFRAME_REQUIRED')),
    timeframe_to: yup
      .string()
      .required(getText('GLOBAL', 'TIMEFRAME_REQUIRED')),
    question1: yup.string().required(getText('GLOBAL', 'QUESTION_REQUIRED')),
    question2: yup.string().required(getText('GLOBAL', 'QUESTION_REQUIRED')),
    question3: yup.string().required(getText('GLOBAL', 'QUESTION_REQUIRED')),
  })

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      firstName: profileInfo?.firstName ? profileInfo.firstName : '',
      lastName: profileInfo?.lastName ? profileInfo.lastName : '',
      email: currentUser ? currentUser.email : '',
      portfolio: profileInfo?.portfolio ? profileInfo.portfolio : '',
      social_dev: profileInfo?.social_dev ? profileInfo.social_dev : '',
      social_github: profileInfo?.social_github
        ? profileInfo.social_github
        : '',
      social_linkedin: profileInfo?.social_linkedin
        ? profileInfo.social_linkedin
        : '',
      social_twitter: profileInfo?.social_twitter
        ? profileInfo.social_twitter
        : '',
      hideInfo: profileInfo?.hideInfo ? profileInfo.hideInfo : '',
      timezone: profileInfo?.timezone ? profileInfo.timezone : '',
      timeframe_from: profileInfo?.timeframe_from
        ? profileInfo.timeframe_from
        : '',
      timeframe_to: profileInfo?.timeframe_to ? profileInfo.timeframe_to : '',
      question1: profileInfo?.question1 ? profileInfo.question1 : '',
      question2: profileInfo?.question2 ? profileInfo.question2 : '',
      question3: profileInfo?.question3 ? profileInfo.question3 : '',
    },
  })

  useEffect(() => {
    reset(profileInfo)
  }, [reset])

  const handleProfileForm = (data) => {
    setLoading(true)
    db.collection('candidates')
      .doc(currentUser.uid)
      .update({
        accountType: 'candidate',
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        portfolio: data.portfolio,
        social_dev: data.social_dev,
        social_github: data.social_github,
        social_linkedin: data.social_linkedin,
        social_twitter: data.social_twitter,
        hideInfo: data.hideInfo,
        timezone: data.timezone,
        timeframe_from: data.timeframe_from,
        timeframe_to: data.timeframe_to,
        question1: data.question1,
        question2: data.question2,
        question3: data.question3,
      })
      .then(() => {
        router.push(`/candidate/${displayName}/dashboard`)
      })
      .catch((err) => {
        throw new Error('Error writing document: ', err)
      })
  }

  return (
    <>
      <AccountInteriorLayout>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='mb-3 text-lg text-blue-900'>
            {getText('GLOBAL', 'PROFILE_INFO')}
          </h1>
        </div>

        <form
          autoComplete='on'
          onSubmit={handleSubmit(handleProfileForm)}
          className='mb-6'
        >
          {/* name */}
          <div className='md:grid grid-cols-2 gap-8'>
            <div className='flex flex-col w-full mb-3'>
              <label htmlFor='firstName'>
                {getText('GLOBAL', 'FIRST_NAME')}
              </label>
              <input
                id='firstName'
                type='text'
                name='firstName'
                className='input'
                ref={register}
              />
              {errors.firstName ? (
                <p className='input-error'>
                  {errors.firstName && errors.firstName.message}
                </p>
              ) : null}
            </div>

            <div className='flex flex-col w-full mb-3'>
              <label htmlFor='lastName'>{getText('GLOBAL', 'LAST_NAME')}</label>
              <input
                id='lastName'
                type='text'
                name='lastName'
                className='input'
                ref={register}
              />
              {errors.lastName ? (
                <p className='input-error'>
                  {errors.lastName && errors.lastName.message}
                </p>
              ) : null}
            </div>
          </div>

          {/* email/portfolio */}
          <div className='md:grid grid-cols-2 gap-8 mb-12'>
            <div className='flex flex-col w-full mb-3 '>
              <label htmlFor='email'>{getText('GLOBAL', 'EMAIL')}</label>
              <input
                id='email'
                type='text'
                name='email'
                className='input'
                ref={register}
              />
              {errors.email ? (
                <p className='input-error'>
                  {errors.email && errors.email.message}
                </p>
              ) : null}
            </div>

            <div className='flex flex-col w-full mb-3 '>
              <label htmlFor='portfolio'>
                {getText('GLOBAL', 'PORTFOLIO')}
                <span className='text-sm font-normal'> (optional)</span>
              </label>
              <input
                id='portfolio'
                type='text'
                name='portfolio'
                className='input'
                ref={register}
              />
            </div>
          </div>

          {/* social/timezone */}
          <div className='md:grid grid-cols-2 gap-8 mb-12'>
            <div className='mb-6 md:mb-0'>
              <label htmlFor='social' className='mb-6'>
                {getText('GLOBAL', 'SOCIAL_ACCOUNTS')}
              </label>

              <div className='flex items-center my-2'>
                <div className='text-3xl opacity-50 mr-4'>
                  <i className='fab fa-dev' />
                </div>
                <input
                  type='text'
                  name='social_dev'
                  className='w-full input'
                  ref={register}
                />
              </div>

              <div className='flex items-center mb-2'>
                <div className='text-3xl opacity-50 mr-3'>
                  <i className='fab fa-github' />
                </div>
                <input
                  type='text'
                  name='social_github'
                  className='w-full input '
                  ref={register}
                />
              </div>

              <div className='flex items-center mb-2'>
                <div className='text-3xl opacity-50 mr-4'>
                  <i className='fab fa-linkedin' />
                </div>
                <input
                  type='text'
                  name='social_linkedin'
                  className='w-full input '
                  ref={register}
                />
              </div>

              <div className='flex items-center mb-2'>
                <div className='text-3xl opacity-50 mr-3'>
                  <i className='fab fa-twitter' />
                </div>
                <input
                  type='text'
                  name='social_twitter'
                  className='w-full input '
                  ref={register}
                />
              </div>
            </div>

            <div className='flex flex-col w-full'>
              {/* hide info */}
              {/* <div className='flex items-center justify-between mb-3'>
                    <label htmlFor='hideInfo' className='mb-0'>
                      {getText('GLOBAL', 'HIDE_INFO')}
                    </label>
                    <div className='relative inline-block w-12 align-middle transition duration-700 ease-in-out select-none'>
                      <input
                        type='checkbox'
                        name='hideInfo'
                        id='toggle'
                        className='absolute block w-5 h-5 bg-white border-gray-300 rounded-full outline-none appearance-none cursor-pointer border-3 toggle-checkbox'
                        ref={register}
                      />
                      <label
                        htmlFor='toggle'
                        className='block h-5 mb-0 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label'
                      ></label>
                    </div>
                  </div> */}

              {/* timezone */}
              <div className='flex flex-col w-full mb-8'>
                <label htmlFor='timezone'>
                  {getText('GLOBAL', 'TIMEZONE')}
                </label>
                <div className='select-wrap'>
                  <select
                    id='timezone'
                    type='text'
                    name='timezone'
                    className='w-full input input-select'
                    ref={register}
                  >
                    <option value={getText('GLOBAL', 'SELECT')}>
                      {getText('GLOBAL', 'SELECT')}
                    </option>

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
                {errors.timezone ? (
                  <p className='input-error'>
                    {errors.timezone && errors.timezone.message}
                  </p>
                ) : null}
              </div>

              {/* timeframe */}
              <div className='flex flex-col w-full'>
                <label htmlFor='timeframe'>
                  {getText('GLOBAL', 'WORK_WITHIN')}
                </label>

                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col w-full '>
                    <div className='select-wrap'>
                      <select
                        id='timeframe_from'
                        type='text'
                        name='timeframe_from'
                        className='input input-select'
                        ref={register}
                      >
                        <option value={getText('GLOBAL', 'SELECT')}>
                          {getText('GLOBAL', 'FROM')}
                        </option>

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
                    {errors.timeframe_from ? (
                      <p className='input-error'>
                        {errors.timeframe_from && errors.timeframe_from.message}
                      </p>
                    ) : null}
                  </div>

                  <div className='flex flex-col w-full '>
                    <div className='select-wrap'>
                      <select
                        id='timeframe_to'
                        type='text'
                        name='timeframe_to'
                        className='input input-select'
                        ref={register}
                      >
                        <option value={getText('GLOBAL', 'SELECT')}>
                          {getText('GLOBAL', 'TO')}
                        </option>

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

                    {errors ? (
                      <p className='input-error'>
                        {errors.timeframe_to && errors.timeframe_to.message}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* question1 */}
          <div className='flex flex-col w-full mb-10 space-y-3'>
            <label htmlFor='question1'>{getText('GLOBAL', 'QUESTION1')}</label>
            <textarea
              name='question1'
              id='question1'
              className='input'
              cols='30'
              rows='5'
              ref={register}
            />
            {errors ? (
              <p className='input-error'>
                {errors.question1 && errors.question1.message}
              </p>
            ) : null}
          </div>

          {/* question2 */}
          <div className='flex flex-col w-full mb-10 space-y-3'>
            <label htmlFor='question2'>{getText('GLOBAL', 'QUESTION2')}</label>
            <textarea
              name='question2'
              id='question2'
              className='input'
              cols='30'
              rows='5'
              ref={register}
            />
            {errors ? (
              <p className='input-error'>
                {errors.question2 && errors.question2.message}
              </p>
            ) : null}
          </div>

          {/* question3 */}
          <div className='flex flex-col w-full mb-4 space-y-3'>
            <label htmlFor='question3'>{getText('GLOBAL', 'QUESTION3')}</label>
            <textarea
              name='question3'
              id='question3'
              className='input'
              cols='30'
              rows='5'
              ref={register}
            />
            {errors ? (
              <p className='input-error'>
                {errors.question3 && errors.question3.message}
              </p>
            ) : null}
          </div>

          <button type='submit' className='btn btn-teal'>
            {getText('GLOBAL', 'SAVE')}
          </button>

          {error ? (
            <p className='p-3 mt-6 text-lg text-center text-red-500 bg-red-100 rounded-md'>
              {error}
            </p>
          ) : null}
        </form>
      </AccountInteriorLayout>
    </>
  )
}

CandidateEditProfile.propTypes = {
  candidateData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    portfolio: PropTypes.string,
    social_dev: PropTypes.string,
    social_github: PropTypes.string,
    social_linkedin: PropTypes.string,
    social_twitter: PropTypes.string,
    hideInfo: PropTypes.bool,
    timezone: PropTypes.string,
    timeframe_from: PropTypes.string,
    timeframe_to: PropTypes.string,
    question1: PropTypes.string,
    question2: PropTypes.string,
    question3: PropTypes.string,
  }),
}

CandidateEditProfile.defaultProps = {
  candidateData: {
    firstName: '',
    lastName: '',
    email: '',
    portfolio: '',
    social_dev: '',
    social_github: '',
    social_linkedin: '',
    social_twitter: '',
    hideInfo: false,
    timezone: '',
    timeframe_from: '',
    timeframe_to: '',
    question1: '',
    question2: '',
    question3: '',
  },
}

export default CandidateEditProfile
