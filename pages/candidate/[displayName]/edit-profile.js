import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAuth } from 'store/AuthContext'
import getText from 'utils/i18n/Texts'

const CandidateEditProfile = () => {
  const router = useRouter()
  const { currentUser, signOut } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [displayName, setDisplayName] = useState()

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
  })

  const handleProfileForm = (data) => {
    setLoading(true)
  }

  const handleSignOut = async () => {
    try {
      await signout()
      router.push('/')
    } catch (error) {
      console.log('Sign Out Error:', error)
    }
  }
  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex flex-col justify-between space-y-6 md:space-x-24 md:space-y-0 md:flex-row'>
        <div className='flex flex-col space-y-4 order-2 md:order-1'>
          <div className='relative -ml-3' style={{ width: '106px' }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              width='106px'
              height='106px'
              className='text-gray-400'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                clipRule='evenodd'
              />
            </svg>

            <div className='absolute bottom-0 flex items-center justify-center bg-teal-500 rounded-full right-3 w-7 h-7'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                width='18px'
                height='18px'
                className='absolute text-white'
              >
                <path
                  fill-rule='evenodd'
                  d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
                  clip-rule='evenodd'
                />
              </svg>
            </div>
          </div>

          <ul className='flex flex-col space-y-3'>
            <li className='font-bold'>{currentUser.email}</li>
            <li>
              <Link href={`candidate/${displayName}/index`}>
                <a>{getText('ACCOUNT', 'VIEW_PROFILE')}</a>
              </Link>
            </li>
            <li>
              <Link href={`candidate/${displayName}/index`}>
                <a className='text-teal-500'>{getText('ACCOUNT', 'EDIT_PROFILE')}</a>
              </Link>
            </li>
            <li className='cursor-pointer' onClick={handleSignOut}>
              {getText('ACCOUNT', 'SIGN_OUT')}
            </li>
            <li className='text-red-500'>
              {getText('ACCOUNT', 'DELETE_ACCOUNT')}
            </li>
          </ul>
        </div>

        <div className='w-full order-1 md:order-2'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='mb-3 text-lg text-blue-900'>Profile Info</h1>
            <button className='btn btn-teal'>
              {getText('ACCOUNT', 'SAVE')}
            </button>
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
                  <div className="text-3xl opacity-50"><i class="fab fa-dev"></i></div>
                  <input type='text' className='w-full input' />
                </div>

                <div className='flex items-center space-x-3'>
                  <div className="text-3xl opacity-50"><i class="fab fa-github"></i></div>
                  <input type='text' className='w-full input ' />
                </div>

                <div className='flex items-center space-x-3'>
                  <div className="text-3xl opacity-50"><i class="fab fa-linkedin"></i></div>
                  <input type='text' className='w-full input ' />
                </div>

                <div className='flex items-center space-x-3'>
                  <div className="text-3xl opacity-50"><i class="fab fa-twitter"></i></div>
                  <input type='text' className='w-full input ' />
                </div>
              </div>

              <div className='flex flex-col justify-between w-full space-y-4'>
                {/* hide info */}
                <div className='flex items-center justify-between mb-3'>
                  <label htmlFor='toggle' className='mb-0'>
                    {getText('ACCOUNT', 'HIDE_INFO')}
                  </label>
                  <div className='relative inline-block w-12 align-middle transition duration-700 ease-in-out select-none'>
                    <input
                      type='checkbox'
                      name='toggle'
                      id='toggle'
                      className='absolute block w-5 h-5 bg-white border-gray-300 rounded-full outline-none appearance-none cursor-pointer border-3 toggle-checkbox'
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
                    className='input'
                    ref={register}
                  >
                    <option value=''>Select</option>
                    <option value='Option #1'>Option #1</option>
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
                      {errors.timeframe ? (
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
  )
}

export default CandidateEditProfile
