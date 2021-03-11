import Image from 'next/image'

const DashboardBanner = () => {
  return (
    <div className='absolute z-0 w-full h-12 overflow-hidden lg:h-32 bg-gradient-to-r from-teal-600 to-teal-100'>
      <div style={{ opacity: '.05' }}>
        <Image
          src='/images/pattern-1.png'
          layout='fill'
          className='object-cover object-top'
        />
      </div>
    </div>
  )
}

export default DashboardBanner
