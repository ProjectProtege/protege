import { useRouter } from 'next/router'
import Unicorn from 'assets/images/Unicorn'
import BackArrow from 'assets/images/icons/back-arrow'

export default function Custom404() {
  const router = useRouter()
  return (
    <div
      className='container flex flex-col md:flex-row md:pt-6 md:pb-32 -mt-10 md:mt-0'
      style={{ maxWidth: 960 }}
    >
      <div className='w-3/4 md:w-1/2 mx-auto  md:mr-24'>
        <Unicorn alt='A stylized unicorn image' className='w-full h-auto' />
      </div>

      <div className='md:w-1/2'>
        <h1 className=' text-blue-900 text-10xl'>404</h1>

        <div>
          <p className='text-sm leading-loose text-blue-600 mb-4'>
            Opps! Looks like we didn&apos;t find the page you were looking for.
            You seemed to have found our unicorn though! We&apos;ve been looking
            everywhere!
          </p>

          <button
            className='text-teal-700 hover:text-teal-900'
            onClick={() => router.back()}
            type='button'
          >
            <BackArrow className='inline-block -mt-1 mr-2' />
            Return to previous page
          </button>
        </div>
      </div>
    </div>
  )
}
