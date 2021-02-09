import PropTypes from 'prop-types'

const FormCard = ({ title, children, className }) => {
  return (
    <div className={`border-t-4 border-teal-500 shadow-md ${className}`}>
      <h2
        style={{
          backgroundImage: `url(/bg-pattern.png)`,
        }}
        className='p-4 text-xl font-bold text-blue-900 bg-blue-100 bg-cover'
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
