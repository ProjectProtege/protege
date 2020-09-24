import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import Nav from '../components/global/Nav'
import Footer from '../components/global/Footer'
import Logo from '../assets/images/protegeLogo.svg'

const Layout = ({ children }) => {
  const location = useLocation().pathname

  return (
    <div className='min-h-screen flex flex-col font-sans'>
      <motion.header
        className={`py-2 absolute w-full md:px-8 z-50 ${
          location !== '/' ? 'bg-white shadow' : null
        } ${
          location === '/admin' || location === '/sign-in' ? 'hidden' : null
        }`}
        initial={{ y: -100 }}
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
