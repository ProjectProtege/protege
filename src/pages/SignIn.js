import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from 'react-router'
import { auth } from '../firebase/firebase'
import { AuthContext } from '../firebase/auth'
import { motion } from 'framer-motion'

import heroBG from '../assets/images/bg-image.jpg'
import ProtegeLogo from '../assets/images/protegeLogo.svg'

const SignIn = ({ history }) => {
  const handleSignIn = useCallback(
    async (event) => {
      event.preventDefault()

      const { email, password } = event.target.elements

      try {
        await auth.signInWithEmailAndPassword(email.value, password.value)
        history.push('/admin')
      } catch (err) {
        alert(err)
      }
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to='/admin' />
  }
  return (
    <div className='relative flex flex-col h-screen justify-center overflow-hidden'>
      <motion.img
        animate={{
          opacity: [0, 1],
        }}
        src={heroBG}
        alt=''
        className='absolute w-full h-full object-cover object-center'
        style={{ zIndex: '-1' }}
      />

      <motion.div
        animate={{
          y: [-30, 10, -2, 0],
          opacity: [0, 1],
        }}
        transition={{
          delay: 0.3,
          duration: 0.5,
          ease: 'easeIn',
        }}
        className='bg-white p-10 mx-auto shadow-md'
      >
        <img src={ProtegeLogo} alt='Protege.dev Logo' className='mb-6' />

        <h1 className='sr-only'>Sign In</h1>

        <form onSubmit={handleSignIn}>
          <div className='flex flex-col mb-3'>
            <label for='email' className='text-blue-900 font-semibold mb-2'>
              Email
            </label>
            <input type='text' name='email' className='input'></input>
          </div>

          <div className='flex flex-col mb-6'>
            <label for='password' className='text-blue-900 font-semibold mb-2'>
              Password
            </label>
            <input type='password' name='password' className='input'></input>
          </div>

          <button type='submit' className='btn btn-teal w-full'>
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default withRouter(SignIn)
