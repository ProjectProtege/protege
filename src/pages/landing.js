import React from 'react'
import Logo from '../assets/images/protegeLogo.svg'

const Landing = () => (
  <div className="landing-wrapper h-screen w-screen absolute top-0 text-center">
    <div className="mt-20 md:mt-32">
      <h1 className="text-teal-600 font-bold text-xl mb-12">Coming Soon...</h1>

      <div className="mb-12">
        <img src={Logo} alt="Protege.dev logo" className="w-3/4 md:w-1/2 mx-auto mb-6"/>

        <h2 className="text-teal-600 font-bold text-3xl mb-12">Connecting Ambition</h2>

        <p className="text-blue-400 text-lg">You can't teach ambition, but you can hire it!<br />Remote job opportunities for junior developers.</p>
      </div>

      <div>
        <p className="font-bold text-blue-500 mb-4">Stay connected about our progress and opportunities!</p>

        <form name="email-list" method="post">
          <label for="email" className="sr-only">Email input</label>

          <input className="w-1/2 lg:w-1/4 bg-gray-300 px-4 py-1" type="email" name="email" id="email" autocomplete="off" required/>

          <button className="btn btn-teal" type="submit">Sign Up</button>

          <input type="hidden" name="form-name" value="email-list"/>
        </form>
      </div>
    </div>
  </div>
)

export default Landing
