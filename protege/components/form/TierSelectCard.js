import { useRouter } from 'next/router'
import { useJobForm } from 'store/job-post_store'
import PropTypes from 'prop-types'

const TierSelectCard = ({ children, value }) => {
  const route = useRouter()
  const setTier = useJobForm((s) => s.setTier)
  const tier = useJobForm((s) => s.tier)

  function handleClick() {
    setTier(value)
  }

  return (
    <button
      className={`p-6 md:p-8 shadow rounded text-left md:text-center cursor-pointer border-t-8 border-gray-300  transform ease-in-out duration-150 bg-white mx-auto mb-4 grid grid-cols-3 md:grid-cols-1 w-full
      ${
        route.route === '/post-a-job'
          ? 'hover:border-teal-300 hover:scale-107 hover:shadow-md'
          : ''
      }
      ${tier === value ? 'border-teal-300 bg-gray-100 scale-105' : ''}`}
      onClick={handleClick}
      type='button'
    >
      {route.route === '/' ? (
        <div className='hidden absolute bg-error px-4 py-2 z-10 text-white uppercase -rotate-15 transform text-sm font-semibold tracking-widest -ml-1 shadow'>
          Free for now!
        </div>
      ) : (
        ''
      )}
      {children}
    </button>
  )
}

TierSelectCard.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
}

export default TierSelectCard
