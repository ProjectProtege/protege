import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAuth } from '../store/AuthContext'

import AccountGraphic from '../assets/images/AccountGraphic'

const ForgotPassword = () => {
  const router = useRouter()
  const { resetPassword } = useAuth()
  const [loading, setLoading] = useState(true)

  const Schema = yup.object().shape({
    email: yup
      .string()
      .email('This must be a valid email address.')
      .required('Email is a required field.'),
  })

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
  })

  const handleResetPassword = async (data) => {
    setLoading(true)
    try {
      await resetPassword(data.email)
      router.push('/sign-in')
      setLoading(false)
      toast.success('Success! Check your email for password reset link.')
    } catch (error) {
      toast.error('Reset Password Error:', error)
    }
    setLoading(false)
  }

  return (
    <div className='max-w-screen-xl py-12 mx-auto md:flex'>
      <div className='mb-12 md:w-1/3 md:mr-24 md:mb-0 md:mt-6'>
        <h1 className='mb-4 text-2xl'>Reset Password</h1>
        <form onSubmit={handleSubmit(handleResetPassword)} className='mb-6'>
          <div className='flex flex-col mb-3'>
            <label htmlFor='email' className='mb-2 '>
              Email
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
            Reset Password
          </button>
        </form>

        <div className='text-xs text-center '>
          <Link href='/sign-in'>
            <a className='text-teal-700 underline'>Back to Sign in.</a>
          </Link>
        </div>
      </div>

      <AccountGraphic className='md:w-2/3' />
    </div>
  )
}

export default ForgotPassword
