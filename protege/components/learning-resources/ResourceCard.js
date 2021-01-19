/* eslint-disable global-require */
/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const ResourceCard = ({ resource }) => {
  return (
    <div className='flex flex-grow justify-center'>
      <div className='max-w-xs overflow-hidden transition duration-150 ease-in-out transform rounded shadow-md cursor-pointer hover:shadow-lg hover:scale-105'>
        <a
          href={`https://${resource.resourceUrl}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            className='w-full'
            // eslint-disable-next-line import/no-dynamic-require
            src={`/resources/${resource.resourceImage}`}
            srcSet={`/resources/${resource.resourceImage}`}
            layout='responsive'
            width={500}
            height={290}
            alt={`${resource.title} screenshot of website`}
          />
        </a>

        <div className='px-6 py-4'>
          <a
            href={`https://${resource.resourceUrl}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className='mb-2 text-xl font-bold text-blue-900'>
              {resource.title}
            </div>
          </a>
          <p className='overflow-hidden text-base text-blue-700 '>
            {resource.description}
          </p>
        </div>
      </div>
    </div>
  )
}

ResourceCard.propTypes = {
  resource: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    resourceImage: PropTypes.string.isRequired,
    resourceUrl: PropTypes.string.isRequired,
  }).isRequired,
}

export default ResourceCard
