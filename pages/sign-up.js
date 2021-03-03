import { useState } from 'react'
import firebase from 'firebase/app'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAuth } from '../store/AuthContext'

import FormCard from 'components/global/FormCard'
import AccountDetails from '../assets/images/AccountDetails'

const SignIn = () => {
  const router = useRouter()
  const { signup } = useAuth()
  const [loading, setLoading] = useState(true)

  const Schema = yup.object().shape({
    email: yup
      .string()
      .email('This must be a valid email address.')
      .required('Email is a required field.'),
    password: yup
      .string()
      .required('Password is a required field.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Passwords must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character.'
      ),
  })

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
  })

  const handleSignUp = async (data) => {
    setLoading(true)
    try {
      await signup(data.email, data.password)
      // firebase.auth().currentUser.sendEmailVerification()
      router.push('/dashboard')
      // console.log('Form data:', data)
      // console.log('sign up successful')
      setLoading(false)
      toast.success('Sign Up Successful.')
    } catch (error) {
      toast.error('Sign Up Error:', error)
    }
    setLoading(false)
  }

  return (
    <div className='max-w-screen-xl mx-auto md:flex lg:py-12'>
      <div className='mb-12 md:w-1/3 md:mr-24 md:mb-0 md:mt-6'>
        <h1 className='mb-4 text-2xl'>Create an Account</h1>
        <form
          autoComplete='on'
          onSubmit={handleSubmit(handleSignUp)}
          className='mb-6'
        >
          <div className='flex flex-col mb-3'>
            <label htmlFor='email' className='mb-2 '>
              Email
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
              Password
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
            Create Account
          </button>
        </form>

        <div className='text-xs text-center '>
          Already have an account? Sign in{' '}
          <Link href='/sign-in'>
            <a className='text-teal-700 underline'>here.</a>
          </Link>
        </div>
      </div>

      <AccountDetails className='md:w-2/3' />
    </div>
  )
}

export default SignIn
