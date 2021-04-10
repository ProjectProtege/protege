import PropTypes from 'prop-types'

const ImageUploadIcon = ({ className }) => (
  <svg
    width='38'
    height='38'
    viewBox='0 0 38 38'
    className={className}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g filter='url(#filter0_d)'>
      <circle cx='17' cy='17' r='14' fill='url(#paint0_linear)' />
    </g>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.3333 13.1111C11.9208 13.1111 11.5251 13.275 11.2334 13.5667C10.9417 13.8585 10.7778 14.2541 10.7778 14.6667V20.8889C10.7778 21.3015 10.9417 21.6971 11.2334 21.9888C11.5251 22.2806 11.9208 22.4445 12.3333 22.4445H21.6667C22.0792 22.4445 22.4749 22.2806 22.7666 21.9888C23.0583 21.6971 23.2222 21.3015 23.2222 20.8889V14.6667C23.2222 14.2541 23.0583 13.8585 22.7666 13.5667C22.4749 13.275 22.0792 13.1111 21.6667 13.1111H20.4331C20.2268 13.1111 20.029 13.0291 19.8832 12.8832L19.0113 12.0114C18.7197 11.7196 18.3241 11.5557 17.9115 11.5556H16.0884C15.6759 11.5557 15.2803 11.7196 14.9887 12.0114L14.1168 12.8832C13.9709 13.0291 13.7731 13.1111 13.5669 13.1111H12.3333ZM17 20.1111C17.3064 20.1111 17.6098 20.0508 17.8929 19.9335C18.176 19.8163 18.4332 19.6444 18.6499 19.4277C18.8666 19.211 19.0385 18.9538 19.1557 18.6707C19.273 18.3876 19.3333 18.0842 19.3333 17.7778C19.3333 17.4714 19.273 17.168 19.1557 16.8849C19.0385 16.6018 18.8666 16.3445 18.6499 16.1279C18.4332 15.9112 18.176 15.7393 17.8929 15.6221C17.6098 15.5048 17.3064 15.4445 17 15.4445C16.3812 15.4445 15.7877 15.6903 15.3501 16.1279C14.9125 16.5655 14.6667 17.159 14.6667 17.7778C14.6667 18.3966 14.9125 18.9901 15.3501 19.4277C15.7877 19.8653 16.3812 20.1111 17 20.1111Z'
      fill='white'
    />
    <defs>
      <filter
        id='filter0_d'
        x='0'
        y='0'
        width='38'
        height='38'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
        />
        <feOffset dx='2' dy='2' />
        <feGaussianBlur stdDeviation='2.5' />
        <feColorMatrix
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0'
        />
        <feBlend
          mode='normal'
          in2='BackgroundImageFix'
          result='effect1_dropShadow'
        />
        <feBlend
          mode='normal'
          in='SourceGraphic'
          in2='effect1_dropShadow'
          result='shape'
        />
      </filter>
      <linearGradient
        id='paint0_linear'
        x1='17'
        y1='3'
        x2='17'
        y2='31'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#6EE5B7' />
        <stop offset='1' stopColor='#5FC19B' />
      </linearGradient>
    </defs>
  </svg>
)

ImageUploadIcon.propTypes = {
  className: PropTypes.string,
}

ImageUploadIcon.defaultProps = {
  className: '',
}

export default ImageUploadIcon
