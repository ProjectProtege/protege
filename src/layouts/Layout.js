import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/global/Nav'
import Footer from '../components/global/Footer'
import Logo from '../assets/images/protegeLogo.svg'
import { motion } from 'framer-motion'

const Layout = ({ children, variant }) => {
  let variantClassName = 'py-2 absolute w-full md:px-3 z-50 bg-white shadow-md'

  switch (variant) {
    case 'home':
      variantClassName = 'py-2 absolute w-full md:px-3 z-50'
      break

    default:
      variantClassName = 'py-2 absolute w-full md:px-3 z-50 bg-white shadow'
      break
  }

  return (
    <div className='min-h-screen flex flex-col font-sans'>
      <motion.header
        className={`${variant} ${variantClassName}`}
        initial={variant === 'home' ? { y: -100 } : { y: 0 }}
        animate={{
          y: 0,
        }}
        transition={{
          ease: 'easeInOut',
          delay: 0.25,
          duration: 0.4,
        }}
      >
        <div className='container mx-auto flex justify-between items-center'>
          <Link to='/' className='pl-2 md:pl-0 w-1/2 md:w-1/6'>
            <img src={Logo} alt='Protege.dev Logo' />
          </Link>
          <Nav />
        </div>
      </motion.header>

      <main className='relative flex-grow'>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
