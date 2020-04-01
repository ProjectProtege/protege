import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Logo from '../assets/images/protegeLogo.svg'

const Layout = ({children}) => (
  <div className='min-h-screen flex flex-col'>
    <header className="py-2">
      <div className='container mx-auto flex justify-between items-center'>
        <Link to="/" className="w-1/2 md:w-1/4">
          <img src={Logo} alt="Protege.dev Logo"/>
        </Link>
        <Nav/>
      </div>
    </header>

    <main>
      {children}
    </main>

    <Footer />
  </div>
)

export default Layout