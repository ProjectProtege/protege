import PropTypes from 'prop-types'
import Link from 'next/link'
import resources from 'data/learning-resources.json'
import ResourceCard from 'components/learning-resources/ResourceCard'

const LearningResources = ({ learningResources }) => {
  return (
    <section className='container max-w-screen-xl mx-auto align-middle sm:max-w-screen-lg'>
      <div className='mx-auto mb-12 text-center'>
        <h1 className='text-2xl tracking-tight text-blue-900 leading sm:leading-10'>
          Learning Resources
        </h1>

        <p className='mb-2 text-base text-blue-700 sm:mt-4 sm:text-base md:text-base'>
          We&apos;ve pulled some of the best free, and paid, resources together
          to help support your journey.
        </p>

        <p className='text-base text-blue-700 sm:mt-4 sm:text-base md:text-base'>
          Got a resource you think we should add to the list?&nbsp;
          <Link href='/get-in-touch'>
            <a className='mb-3 text-blue-900 underline hover:text-teal-700'>
              Reach out!
            </a>
          </Link>
        </p>
      </div>

      <div className='container mx-auto my-4 text-center md:text-left'>
        <div>
          <h3 className='mb-6 text-2xl text-blue-900'>Free Resources</h3>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 '>
            {learningResources.free.map((resource) => (
              <ResourceCard resource={resource} key={resource.id} />
            ))}
          </div>
        </div>

        <div className='mt-20'>
          <h3 className='mb-6 text-2xl text-blue-900'>Paid Resources</h3>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
          {learningResources.paid.map((resource) => (
            <ResourceCard resource={resource} key={resource.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

LearningResources.propTypes = {
  learningResources: PropTypes.shape({
    free: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        resourceImage: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        resourceUrl: PropTypes.string.isRequired,
      })
    ),
    paid: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        resourceImage: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        resourceUrl: PropTypes.string.isRequired,
      })
    ),
  }),
}

export async function getStaticProps() {
  return {
    props: {
      learningResources: resources,
    },
  }
}

export default LearningResources
