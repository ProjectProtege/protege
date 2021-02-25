import Link from 'next/link'
import WanderingMind from 'assets/images/WanderingMind'

const Thanks = () => {
  return (
    <div className='container items-center max-w-screen-xl flex flex-col md:flex-row md:pt-6 md:pb-32 -mt-10 md:mt-0'>
      <div className='w-3/4 md:w-1/2 mx-auto md:mr-24'>
        <WanderingMind
          alt='A stylized unicorn image'
          className='w-full h-auto'
        />
      </div>
      <div className='md:w-1/2'>
        <h1 className='mb-3 text-2xl text-blue-500'>
          Thanks for your comment!
        </h1>

        <p className='mb-12'>
          We appreciate your input and the team will review it soon.
          <br />
          <br />
          We&apos;ll reach out if we have any follow up!
        </p>

        <Link href='/'>
          <a className='text-teal-700 underline'>Return to Homepage</a>
        </Link>
      </div>
    </div>
  )
}

export default Thanks
