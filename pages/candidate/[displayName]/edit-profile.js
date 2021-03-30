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
import NavLink from 'components/global/NavLink'

import getText from 'utils/i18n/Texts'
import ProfileMenu from 'components/user/ProfileMenu'

import timezones from 'data/timezones.json'

const CandidateEditProfile = ({ candidateData }) => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timezonesArray, setTimezonesArray] = useState([])
  const profileInfo = useProfileInfo((s) => s.profileInfo)

  let displayName = router.query.displayName

  useEffect(() => {
    setTimezonesArray(timezones)
  }, [])

  const Schema = yup.object().shape({
    firstName: yup.string().required(getText('ACCOUNT', 'FIRST_NAME_REQUIRED')),
    lastName: yup.string().required(getText('ACCOUNT', 'LAST_NAME_REQUIRED')),
    email: yup
      .string()
      .email(getText('ACCOUNT', 'EMAIL_VALID'))
      .required(getText('ACCOUNT', 'EMAIL_REQUIRED')),
    timezone: yup.string().required(getText('ACCOUNT', 'TIMEZONE_REQUIRED')),
    timeframe_from: yup
      .string()
      .required(getText('ACCOUNT', 'TIMEFRAME_REQUIRED')),
    timeframe_to: yup
      .string()
      .required(getText('ACCOUNT', 'TIMEFRAME_REQUIRED')),
    question1: yup.string().required(getText('ACCOUNT', 'QUESTION_REQUIRED')),
    question2: yup.string().required(getText('ACCOUNT', 'QUESTION_REQUIRED')),
    question3: yup.string().required(getText('ACCOUNT', 'QUESTION_REQUIRED')),
  })

  const { register, handleSubmit, control, errors } = useForm({
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
        console.log('Document successfully written!')
        router.push(`/candidate/${displayName}/dashboard`)
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  }

  return (
    <>
      <div className='max-w-4xl mx-auto'>
        <div className='flex flex-col justify-between space-y-6 md:space-x-24 md:space-y-0 md:flex-row'>
          <div className='flex flex-col order-2 space-y-4 md:order-1'>
            <ProfileMenu>
              <li className='font-bold'>{displayName}</li>
              <li>
                <NavLink
                  href={`/candidate/${displayName}/`}
                  activeClassName='text-teal-500'
                >
                  {getText('ACCOUNT', 'VIEW_PROFILE')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  href={`/candidate/${displayName}/edit-profile`}
                  activeClassName='text-teal-500 font-bold'
                >
                  {getText('ACCOUNT', 'EDIT_PROFILE')}
                </NavLink>
              </li>
            </ProfileMenu>
          </div>

          <div className='order-1 w-full md:order-2'>
            <div className='flex items-center justify-between mb-6'>
              <h1 className='mb-3 text-lg text-blue-900'>
                {getText('ACCOUNT', 'PROFILE_INFO')}
              </h1>
            </div>

            <form
              autoComplete='on'
              onSubmit={handleSubmit(handleProfileForm)}
              className='mb-6'
            >
              {/* name */}
              <div className='flex flex-col justify-between md:space-x-8 md:flex-row'>
                <div className='flex flex-col w-full mb-3 space-y-1'>
                  <label htmlFor='firstName'>
                    {getText('ACCOUNT', 'FIRST_NAME')}
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

                <div className='flex flex-col w-full mb-3 space-y-1'>
                  <label htmlFor='lastName'>
                    {getText('ACCOUNT', 'LAST_NAME')}
                  </label>
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
              <div className='flex flex-col justify-between mb-8 md:space-x-8 md:flex-row'>
                <div className='flex flex-col w-full mb-3 space-y-1'>
                  <label htmlFor='email'>{getText('ACCOUNT', 'EMAIL')}</label>
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

                <div className='flex flex-col w-full mb-3 space-y-1'>
                  <label htmlFor='portfolio'>
                    {getText('ACCOUNT', 'PORTFOLIO')}
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
              <div className='flex flex-col justify-between mb-12 space-y-6 md:space-y-0 md:space-x-8 md:flex-row'>
                <div className='flex flex-col w-full space-y-4'>
                  <label htmlFor='social' className='mb-0'>
                    {getText('ACCOUNT', 'SOCIAL_ACCOUNTS')}
                  </label>
                  <div className='flex items-center space-x-3'>
                    <div className='text-3xl opacity-50'>
                      <i className='fab fa-dev'></i>
                    </div>
                    <input
                      type='text'
                      name='social_dev'
                      className='w-full input'
                      ref={register}
                    />
                  </div>

                  <div className='flex items-center space-x-2'>
                    <div className='text-3xl opacity-50'>
                      <i className='fab fa-github'></i>
                    </div>
                    <input
                      type='text'
                      name='social_github'
                      className='w-full input '
                      ref={register}
                    />
                  </div>

                  <div className='flex items-center space-x-3'>
                    <div className='text-3xl opacity-50'>
                      <i className='fab fa-linkedin'></i>
                    </div>
                    <input
                      type='text'
                      name='social_linkedin'
                      className='w-full input '
                      ref={register}
                    />
                  </div>

                  <div className='flex items-center space-x-2'>
                    <div className='text-3xl opacity-50'>
                      <i className='fab fa-twitter'></i>
                    </div>
                    <input
                      type='text'
                      name='social_twitter'
                      className='w-full input '
                      ref={register}
                    />
                  </div>
                </div>

                <div className='flex flex-col justify-between w-full space-y-4'>
                  {/* hide info */}
                  <div className='flex items-center justify-between mb-3'>
                    <label htmlFor='hideInfo' className='mb-0'>
                      {getText('ACCOUNT', 'HIDE_INFO')}
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
                  </div>

                  {/* timezone */}
                  <div className='flex flex-col w-full space-y-1'>
                    <label htmlFor='timezone'>
                      {getText('ACCOUNT', 'TIMEZONE')}
                    </label>
                    <select
                      id='timezone'
                      type='text'
                      name='timezone'
                      className='w-full input'
                      ref={register}
                    >
                      <option value={getText('DASHBOARD', 'SELECT')}>
                        {getText('DASHBOARD', 'SELECT')}
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
                    {errors.timezone ? (
                      <p className='input-error'>
                        {errors.timezone && errors.timezone.message}
                      </p>
                    ) : null}
                  </div>

                  {/* timeframe */}
                  <div className='flex flex-col w-full space-y-4'>
                    <label htmlFor='timeframe'>
                      {getText('ACCOUNT', 'TIMEFRAME')}
                    </label>

                    <div className='flex justify-between space-x-3'>
                      <div className='flex flex-col w-full space-y-1'>
                        <select
                          id='timeframe_from'
                          type='text'
                          name='timeframe_from'
                          className='input'
                          ref={register}
                        >
                          <option value=''>From</option>
                          <option value='Option #1'>Option #1</option>
                        </select>
                        {errors.timeframe_from ? (
                          <p className='input-error'>
                            {errors.timeframe_from &&
                              errors.timeframe_from.message}
                          </p>
                        ) : null}
                      </div>

                      <div className='flex flex-col w-full space-y-1'>
                        <select
                          id='timeframe_to'
                          type='text'
                          name='timeframe_to'
                          className='input'
                          ref={register}
                        >
                          <option value=''>To</option>
                          <option value='Option #1'>Option #1</option>
                        </select>

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
                <label htmlFor='question1'>
                  {getText('ACCOUNT', 'QUESTION1')}
                </label>
                <textarea
                  name='question1'
                  id='question1'
                  className='input'
                  cols='30'
                  rows='5'
                  ref={register}
                ></textarea>
                {errors ? (
                  <p className='input-error'>
                    {errors.question1 && errors.question1.message}
                  </p>
                ) : null}
              </div>

              {/* question2 */}
              <div className='flex flex-col w-full mb-10 space-y-3'>
                <label htmlFor='question2'>
                  {getText('ACCOUNT', 'QUESTION2')}
                </label>
                <textarea
                  name='question2'
                  id='question2'
                  className='input'
                  cols='30'
                  rows='5'
                  ref={register}
                ></textarea>
                {errors ? (
                  <p className='input-error'>
                    {errors.question2 && errors.question2.message}
                  </p>
                ) : null}
              </div>

              {/* question3 */}
              <div className='flex flex-col w-full mb-4 space-y-3'>
                <label htmlFor='question3'>
                  {getText('ACCOUNT', 'QUESTION3')}
                </label>
                <textarea
                  name='question3'
                  id='question3'
                  className='input'
                  cols='30'
                  rows='5'
                  ref={register}
                ></textarea>
                {errors ? (
                  <p className='input-error'>
                    {errors.question3 && errors.question3.message}
                  </p>
                ) : null}
              </div>

              <button type='submit' className='btn btn-teal'>
                {getText('ACCOUNT', 'SAVE')}
              </button>

              {error ? (
                <p className='p-3 mt-6 text-lg text-center text-red-500 bg-red-100 rounded-md'>
                  {error}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
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
    hideInfo: PropTypes.boolean,
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
