import PropTypes from 'prop-types'

const FormCard = ({ title, children, className }) => {
  return (
    <div
      className={`relative shadow-md rounded-md overflow-hidden ${className}`}
    >
      <div className='w-full h-3 bg-gradient-to-r from-teal-500 to-teal-300 absolute top-0' />
      <h2
        style={{
          backgroundImage: `url(/bg-pattern.png)`,
        }}
        className='p-4 mt-2 text-xl text-blue-900 bg-blue-100 bg-cover'
      >
        {title}
      </h2>

      {children}
    </div>
  )
}

FormCard.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.shape({}).isRequired,
}

FormCard.defaultProps = {
  className: '',
}

export default FormCard
