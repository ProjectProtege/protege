/* eslint-disable global-require */
/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'

const ResourceCard = ({ resource }) => {
  return (
    <div className='flex flex-grow justify-center'>
      <div className='max-w-xs overflow-hidden transition duration-150 ease-in-out transform rounded shadow-md cursor-pointer hover:shadow-lg hover:scale-105 focus-within:ring focus-within:ring-teal'>
        <a
          href={`https://${resource.resourceUrl}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <div className='h-48 overflow-hidden'>
            <img
              className='w-full'
              // eslint-disable-next-line import/no-dynamic-require
              src={`/resources/${resource.resourceImage}`}
              alt={`${resource.title} screenshot of website`}
            />
          </div>
          <div className='px-6 py-4'>
            <div className='mb-2 text-xl font-bold text-blue-900'>
              {resource.title}
            </div>
            <p className='overflow-hidden text-base text-blue-700 '>
              {resource.description}
            </p>
          </div>
        </a>
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
