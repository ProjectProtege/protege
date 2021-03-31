import { useState } from 'react'
import firebase from 'firebase/app'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAuth } from 'store/AuthContext'
import getText from 'utils/i18n/Texts'

import AccountDetails from 'assets/images/AccountDetails'

const SignUp = ({ accountType }) => {
  const router = useRouter()
  const { currentUser, signup, signInWithGithub } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [displayName, setDisplayName] = useState('')

  const Schema = yup.object().shape({
    name: yup.string().required(getText('GLOBAL', 'NAME_REQUIRED')),
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

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
  })

  const handleSignUp = async (data) => {
    setLoading(true)

    try {
      await signup(data.name, data.email, data.password, accountType)
      firebase.auth().currentUser.sendEmailVerification()

      setLoading(false)
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  const handleSignInWithGithub = async () => {
    try {
      await signInWithGithub()
      router.push('/account-select')
    } catch (error) {
      setError(error.messge)
    }
  }

  return (
    <div className='max-w-screen-xl mx-auto md:flex lg:py-12'>
      <div className='mb-12 md:w-1/3 md:mr-24 md:mb-0 md:mt-6'>
        <h1 className='mb-4 text-2xl'>{getText('GLOBAL', 'ACCOUNT_CREATE')}</h1>
        <form
          autoComplete='on'
          onSubmit={handleSubmit(handleSignUp)}
          className='mb-6'
        >
          <div className='flex flex-col mb-3'>
            {accountType === 'company' ? (
              <label htmlFor='email' className='mb-2 '>
                {getText('GLOBAL', 'COMPANY_NAME')}
              </label>
            ) : (
              <label htmlFor='email' className='mb-2 '>
                {getText('GLOBAL', 'NAME')}
              </label>
            )}
            <input
              id='name'
              type='text'
              name='name'
              className='input'
              ref={register}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <p className='input-error'>{errors.name && errors.name.message}</p>
          </div>

          <div className='flex flex-col mb-3'>
            <label htmlFor='email' className='mb-2 '>
              {accountType === 'company'
                ? getText('GLOBAL', 'EMAIL_COMPANY')
                : getText('GLOBAL', 'EMAIL')}
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
            <label htmlFor='password' className='mb-2 '>
              {getText('GLOBAL', 'PASSWORD')}
            </label>
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
            {getText('GLOBAL', 'ACCOUNT_CREATE')}
          </button>

          {error ? (
            <p className='p-3 mt-6 text-lg text-center text-red-500 bg-red-100 rounded-md'>
              {error}
            </p>
          ) : null}
        </form>
        <div className='flex flex-col space-y-4'>
          <div className='text-xs text-center '>
            {getText('GLOBAL', 'ACCOUNT_SIGN_IN')}{' '}
            <Link href='/sign-in'>
              <a className='text-teal-700 underline'>
                {getText('GLOBAL', 'HERE')}
              </a>
            </Link>
          </div>
          <div className='text-xs text-center'>{getText('GLOBAL', 'OR')}</div>
          <button
            className='flex p-2 m-auto space-x-2 text-green-500 border border-green-500 rounded-md'
            onClick={handleSignInWithGithub}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='fill-current'
            >
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
            <span>{getText('GLOBAL', 'GITHUB')}</span>
          </button>
        </div>
      </div>

      <AccountDetails className='md:w-2/3' />
    </div>
  )
}

SignUp.getInitialProps = ({ query: { accountType } }) => {
  return { accountType }
}

export default SignUp
