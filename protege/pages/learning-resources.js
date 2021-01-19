import Link from 'next/link'
import resources from 'data/learning-resources.json'
import ResourceCard from 'components/learning-resources/ResourceCard'

const LearningResources = () => {
  return (
    <section className='container m-auto max-w-screen-xl align-middle sm:max-w-screen-lg'>
      <div className='relative px-12 text-center mx-auto my-10 sm:px-40 lg:px-32'>
        <h1 className='text-2xl leading tracking-tight font-extrabold text-blue-900 sm:leading-10 sm:text-3xl'>
          Learning Resources
        </h1>

        <p className='text-base mb-2 text-blue-700 sm:mt-4 sm:px-12 sm:text-base md:text-base'>
          We&apos;ve pulled some of the best free, and paid, resources together
          to help support your journey.
        </p>

        <p className='text-base text-blue-700 sm:mt-4 sm:text-base md:text-base'>
          Got a resource you think we should add to the list?&nbsp;
          <Link href='/get-in-touch'>
            <a className='underline mb-3 text-teal-800'>Reach out!</a>
          </Link>
        </p>
      </div>

      <div className='container mx-auto text-center md:text-left my-4 px-8'>
        <div>
          <h3 className='text-2xl font-bold text-blue-900 md:text-3xl mb-6'>
            Free Resources
          </h3>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 '>
            {resources.free.map((resource) => (
              <ResourceCard resource={resource} key={resource.id} />
            ))}
          </div>
        </div>

        <div className='mt-20'>
          <h3 className='text-2xl font-bold text-blue-900 md:text-3xl mb-6'>
            Paid Resources
          </h3>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {resources.paid.map((resource) => (
            <ResourceCard resource={resource} key={resource.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LearningResources
