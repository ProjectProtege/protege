import Link from 'next/link'

const Thanks = () => {
  return (
    <div className='container' style={{ maxWidth: 680 }}>
      <h1 className='text-2xl text-blue-500 mb-3'>Thanks for your comment!</h1>

      <p className='text-blue-200 mb-12'>
        We appreciate your input and the team will review it soon.
        <br />
        <br />
        We&apos;ll reach out if we have any follow up!
      </p>

      <Link href='/'>
        <a className='text-teal-700 underline'>Return to Homepage</a>
      </Link>
    </div>
  )
}

export default Thanks
