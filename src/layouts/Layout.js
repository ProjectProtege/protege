import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Logo from '../assets/images/protegeLogo.svg'

const Layout = ({children}) => (
  <div>
    <header className="p-3">
      <div className='container mx-auto flex justify-between items-center'>
        <div style={{width: 250}}>
          <img src={Logo} alt="Protege.dev Logo"/>
        </div>
        <Nav />
      </div>
    </header>
      {children}
    <Footer />
  </div>
)

export default Layout