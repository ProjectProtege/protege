import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAuth } from '../store/AuthContext'
import getText from '@/utils/i18n/Texts'

import AccountGraphic from '../assets/images/AccountGraphic'

const ForgotPassword = () => {
  const router = useRouter()
  const { resetPassword } = useAuth()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const Schema = yup.object().shape({
    email: yup
      .string()
      .email(getText('ACCOUNT', 'EMAIL_VALID'))
      .required(getText('ACCOUNT', 'EMAIL_REQUIRED')),
  })

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
  })

  const handleResetPassword = async (data) => {
    setLoading(true)
    try {
      await resetPassword(data.email)
      setSuccess(getText('ACCOUNT', 'PASSWORD_RESET_SUCCESS'))
      setError(null)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setSuccess(null)
    }
    setLoading(false)
  }

  return (
    <div className='max-w-screen-xl py-12 mx-auto md:flex'>
      <div className='mb-12 md:w-1/3 md:mr-24 md:mb-0 md:mt-6'>
        <h1 className='mb-4 text-2xl'>
          {getText('ACCOUNT', 'PASSWORD_RESET')}
        </h1>
        <form onSubmit={handleSubmit(handleResetPassword)} className='mb-6'>
          <div className='flex flex-col mb-3'>
            <label htmlFor='email' className='mb-2 '>
              {getText('ACCOUNT', 'EMAIL')}
            </label>
            <input
              id='email'
              ype='text'
              name='email'
              className='input'
              ref={register}
            />
            <p className='input-error'>
              {errors.email && errors.email.message}
            </p>
          </div>

          <button type='submit' className='w-full btn btn-teal'>
            {getText('ACCOUNT', 'PASSWORD_RESET')}
          </button>

          {success ? (
            <p className='p-3 mt-6 text-lg text-center text-teal-900 bg-teal-100 rounded-md'>
              {success}
            </p>
          ) : null}

          {error ? (
            <p className='p-3 mt-6 text-lg text-center text-red-500 bg-red-100 rounded-md'>
              {error}
            </p>
          ) : null}
        </form>

        <div className='text-xs text-center '>
          <Link href='/sign-in'>
            <a className='text-teal-700 underline'>
              {getText('ACCOUNT', 'BACK')}
            </a>
          </Link>
        </div>
      </div>

      <AccountGraphic className='md:w-2/3' />
    </div>
  )
}

export default ForgotPassword
