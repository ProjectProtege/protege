import Image from 'next/image'

const DashboardBanner = () => {
  return (
    <div className='relative h-20 overflow-hidden bg-gradient-to-r from-teal-600 to-teal-100'>
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
