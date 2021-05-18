import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAuth } from 'store/AuthContext'
import getText from 'utils/i18n/Texts'

import AccountGraphic from 'assets/images/AccountGraphic'

const SignIn = () => {
  const router = useRouter()
  const { signin, signInWithGithub } = useAuth()
  // TODO: useState value not used, this useState could probably be removed or
  //       a loading state needs to be added to the UI.
  // eslint-disable-next-line no-unused-vars
  const [_, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const Schema = yup.object().shape({
    email: yup
      .string()
      .email(getText('GLOBAL', 'EMAIL_VALID'))
      .required(getText('GLOBAL', 'EMAIL_REQUIRED')),
    password: yup
      .string()
      .required(getText('GLOBAL', 'PASSWORD_REQUIRED'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        getText('GLOBAL', 'PASSWORD_MATCH')
      ),
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
  })

  const handleSignIn = async (data) => {
    setLoading(true)
    try {
      await signin(data.email, data.password).then(() => {
        setLoading(false)
      })
    } catch (handleSignInError) {
      setError(handleSignInError.message)
    }
    setLoading(false)
  }

  const handleSignInWithGithub = async () => {
    try {
      await signInWithGithub()
      router.push('/dashboard')
    } catch (handleSignInWithGithubError) {
      setError(handleSignInWithGithubError.message)
    }
  }

  return (
    <div className='max-w-screen-xl py-12 mx-auto md:flex'>
      <div className='mb-12 md:w-1/3 md:mr-24 md:mb-0 md:mt-6'>
        <h1 className='mb-4 text-2xl'>{getText('GLOBAL', 'SIGN_IN')}</h1>
        <form onSubmit={handleSubmit(handleSignIn)} className='mb-6'>
          <div className='flex flex-col mb-3'>
            <label htmlFor='email' className='mb-2 '>
              {getText('GLOBAL', 'EMAIL')}
            </label>
            <input
              id='email'
              type='text'
              name='email'
              className='input'
              ref={register}
            />
            <p className='input-error'>
              {errors.email && errors.email.message}
            </p>
          </div>

          <div className='flex flex-col mb-6'>
            <div className='flex items-center justify-between'>
              <label htmlFor='password' className='mb-2 '>
                {getText('GLOBAL', 'PASSWORD')}
              </label>
              <div className='text-xs text-right'>
                <Link href='/forgot-password'>
                  <a className='text-teal-700 underline'>
                    {getText('GLOBAL', 'PASSWORD_FORGOT')}
                  </a>
                </Link>
              </div>
            </div>
            <input
              id='password'
              type='password'
              name='password'
              className='input'
              ref={register}
            />
            <p className='input-error'>
              {errors.password && errors.password.message}
            </p>
          </div>

          <button type='submit' className='w-full btn btn-teal'>
            {getText('GLOBAL', 'SIGN_IN')}
          </button>

          {error ? (
            <p className='p-3 mt-6 text-lg text-center text-red-500 bg-red-100 rounded-md'>
              {error}
            </p>
          ) : null}
        </form>

        <div className='flex flex-col space-y-4'>
          <div className='text-xs text-center'>
            {getText('GLOBAL', 'ACCOUNT_SIGN_UP')}{' '}
            <Link href='/account-select'>
              <a className='text-teal-700 underline'>
                {getText('GLOBAL', 'HERE')}
              </a>
            </Link>
          </div>
          <div className='text-xs text-center'>{getText('GLOBAL', 'OR')}</div>
          <button
            className='flex items-center px-6 py-4 m-auto space-x-2 text-teal-700 transition ease-in-out border border-teal-500 rounded-md hover:border-teal-800 hover:bg-teal-100 hover:text-teal-900'
            onClick={handleSignInWithGithub}
            type='button'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-6 h-6 fill-current'
            >
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
            <span className='text-xs'>{getText('GLOBAL', 'GITHUB')}</span>
          </button>
        </div>
      </div>

      <AccountGraphic className='md:w-2/3' />
    </div>
  )
}

export default SignIn
