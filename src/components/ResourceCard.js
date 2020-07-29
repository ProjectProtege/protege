import React from 'react'

const ResourceCard = (props) => {
  const { title, resourceImage, description, resourceUrl, tag } = props

  return (
    <div className='p-4 sm:p-2'>
      <div className='max-w-xs rounded overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transform transition duration-150 ease-in-out cursor-pointer'>
        <a
          href={'http://' + resourceUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className='w-full'
            src={require(`../assets/images/resources/${resourceImage}`)}
            alt='Resource screenshot of website'
          />
        </a>
        <div className='px-6 py-4'>
          <a
            href={'http://' + resourceUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className='font-bold text-xl mb-2 text-blue-900'>{title}</div>
          </a>
          <p className='text-blue-700 overflow-hidden text-base '>
            {description}
          </p>
        </div>
      </div>
      <div className='px-6 py-4'>
        <span className='inline-block bg-teal-100 rounded-full px-3 py-1 text-sm font-semibold text-teal-900'>
          #{tag}
        </span>
      </div>
    </div>
  )
}

export default ResourceCard
