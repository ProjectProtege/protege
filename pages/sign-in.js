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
  const { currentUser, signin, signInWithGithub } = useAuth()
  const [loading, setLoading] = useState(true)
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

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
  })

  const handleSignIn = async (data) => {
    setLoading(true)
    try {
      await signin(data.email, data.password).then(() => {
        setLoading(false)
      })
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const handleSignInWithGithub = async (data) => {
    try {
      await signInWithGithub()
      router.push('/dashboard')
    } catch (error) {
      setError(error.messge)
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
              ype='text'
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
            {errors.password ? (
              <p className='input-error'>
                {errors.password && errors.password.message}
              </p>
            ) : null}
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
        </div>
      </div>

      <AccountGraphic className='md:w-2/3' />
    </div>
  )
}

export default SignIn
