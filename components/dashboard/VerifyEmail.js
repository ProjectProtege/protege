import Unverified from 'assets/images/Unverified'
import { useAuth } from 'store/AuthContext'
import toast from 'react-hot-toast'

const VerifyEmail = () => {
  const { resendVerificationEmail } = useAuth()

  const handleEmailResend = async () => {
    try {
      await resendVerificationEmail().then(() => {
        toast.success('Email Sent!')
      })
    } catch (error) {
      console.log(error)
      toast.error('Oops! Try again.')
    }
  }

  return (
    <div className='grid md:grid-cols-2 gap-12 items-center mb-24 md:mb-0'>
      <Unverified className='max-h-[50vh]' />

      <div className='flex flex-col space-y-6 md:mb-10'>
        <h2 className='text-2xl leading-tight'>
          Verify your email before getting started!
        </h2>

        <p className='text-blue-700'>
          Check your email and click the link we sent to verify your email and
          unlock your account!
        </p>

        <p className='text-blue-700'>
          Need another one? Don&apos;t see the first one?{' '}
        </p>

        <button
          className='btn btn-teal md:w-1/2'
          type='button'
          onClick={() => handleEmailResend()}
        >
          Resend Verification
        </button>
      </div>
    </div>
  )
}

export default VerifyEmail
