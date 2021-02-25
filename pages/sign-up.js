import Image from 'next/image'
import Link from 'next/link'
import FormCard from 'components/global/FormCard'
import AccountDetails from '../assets/images/AccountDetails'

const SignIn = () => {
  function handleSignUp() {
    console.log('Signed up!')
  }
  return (
    <div className='md:flex max-w-screen-xl mx-auto lg:py-12'>
      <div className='md:w-1/3 md:mr-24 mb-12 md:mb-0 md:mt-6'>
        <h1 className='text-2xl mb-4'>Create an Account</h1>
        <form onSubmit={handleSignUp} className='mb-6'>
          <div className='flex flex-col mb-3'>
            <label htmlFor='email' className=' mb-2'>
              Email
            </label>
            <input id='email' ype='text' name='email' className='input' />
          </div>

          <div className='flex flex-col mb-6'>
            <label htmlFor='password' className=' mb-2'>
              Password
            </label>
            <input
              id='password'
              type='password'
              name='password'
              className='input'
            />
          </div>

          <button type='submit' className='btn btn-teal w-full'>
            Create Account
          </button>
        </form>

        <div className='text-center text-xs '>
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
