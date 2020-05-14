import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Logo from '../assets/images/protegeLogo.svg'
import { motion } from 'framer-motion'

const Layout = ({ children }) => (
  <div className='min-h-screen flex flex-col'>
    <motion.header
      className='py-2 absolute w-full md:px-3 z-50'
      initial={{
        y: -100,
      }}
      animate={{
        y: [-100, 5, 0],
      }}
      transition={{
        ease: 'easeInOut',
        delay: 0.25,
        duration: 0.4,
      }}
    >
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='pl-2 md:pl-0 w-1/2 md:w-1/5 lg:w-1/4'>
          <img src={Logo} alt='Protege.dev Logo' />
        </Link>
        <Nav />
      </div>
    </motion.header>

    <main className='relative flex-grow'>{children}</main>

    <Footer />
  </div>
)

export default Layout
