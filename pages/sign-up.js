import { useState } from 'react'
import firebase from 'firebase/app'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAuth } from 'store/AuthContext'
import getText from 'utils/i18n/Texts'

import AccountDetails from 'assets/images/AccountDetails'

const SignUp = ({ accountType }) => {
  const router = useRouter()
  const { signup, signInWithGithub } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
  })

  const handleSignUp = async (data) => {
    setLoading(true)

    try {
      await signup(data.name, data.email, data.password, accountType)
      firebase.auth().currentUser.sendEmailVerification()

      setLoading(false)
    } catch (err) {
      setError(err.message)
    }

    setLoading(false)
  }

  const handleSignInWithGithub = async () => {
    try {
      await signInWithGithub()
      router.push('/account-select')
    } catch (err) {
      setError(err.messge)
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
          data-cy='sign-up-form'
        >
          <div className='flex flex-col mb-3'>
            {accountType === 'company' ? (
              <label htmlFor='name' className='mb-2 '>
                {getText('GLOBAL', 'COMPANY_NAME')}
              </label>
            ) : (
              <label htmlFor='name' className='mb-2 '>
                {getText('GLOBAL', 'NAME')}
              </label>
            )}
            <input
              id='name'
              type='text'
              name='name'
              className='input'
              ref={register}
            />
            {errors.name ? (
              <p className='input-error' data-cy='name-error'>
                {errors.name && errors.name.message}
              </p>
            ) : null}
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
              data-cy='candidate-email'
            />

            {errors.email ? (
              <p className='input-error' data-cy='email-error'>
                {errors.email && errors.email.message}
              </p>
            ) : null}
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
              data-cy='candidate-password'
            />
            {errors.password ? (
              <p className='input-error' data-cy='password-error'>
                {errors.password && errors.password.message}
              </p>
            ) : null}
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
        </div>
      </div>

      <AccountDetails className='md:w-2/3' />
    </div>
  )
}

SignUp.getInitialProps = ({ query: { accountType } }) => {
  return { accountType }
}

SignUp.propTypes = {
  accountType: PropTypes.string.isRequired,
}

export default SignUp
