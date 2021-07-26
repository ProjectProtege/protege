import Unverified from 'assets/images/Unverified'

const VerifyEmail = () => {
  return (
    <div className='grid md:grid-cols-2 gap-12 items-center mb-24 md:mb-0'>
      <Unverified className='max-h-[50vh]' />
      <div className='flex flex-col space-y-6'>
        <h2 className='text-2xl leading-tight'>
          Verify your email before getting started!
        </h2>
        <p className='text-blue-700'>
          Check your email and click the link we sent to verify your email and
          unlock your account!
        </p>
        <p className='text-blue-700'>
          Need another one? Don&apos;t see the first one?{' '}
          <button className='underline text-teal-700 font-bold' type='button'>
            Click here
          </button>{' '}
          to have a fresh one sent to you!
        </p>
      </div>
    </div>
  )
}

export default VerifyEmail
