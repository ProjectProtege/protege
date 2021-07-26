import { useRouter } from 'next/router'
import { useJobForm } from 'store/job-post_store'
import PropTypes from 'prop-types'

const TierSelectCard = ({ children, value, className }) => {
  const route = useRouter()
  const setTier = useJobForm((s) => s.setTier)
  const tier = useJobForm((s) => s.tier)

  function handleClick() {
    setTier(value)
  }

  return (
    <button
      className={`${className} overflow-hidden p-6 md:p-8 shadow rounded text-left md:text-center cursor-pointer transform ease-in-out duration-150 bg-white mx-auto mb-4 grid grid-cols-3 md:grid-cols-1 w-full
      ${
        route.pathname === '/post-a-job'
          ? 'hover:border-teal-300 hover:scale-107 hover:shadow-md'
          : ''
      }
      ${tier === value ? 'border-teal-300 bg-gray-100 scale-105' : ''}`}
      onClick={handleClick}
      type='button'
    >
      <div
        className={`absolute w-full h-2 top-0 left-0 bg-gradient-to-r from-gray-400 to-gray-300 ${
          tier === value ? 'from-teal-500 to-teal-300' : ''
        }`}
      ></div>
      {route.pathname === '/' ? (
        <div className='absolute z-10 hidden px-4 py-2 -ml-1 text-sm font-semibold tracking-widest text-white uppercase transform shadow bg-error -rotate-15'>
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
  className: PropTypes.string,
}

TierSelectCard.defaultProps = {
  className: '',
}

export default TierSelectCard
