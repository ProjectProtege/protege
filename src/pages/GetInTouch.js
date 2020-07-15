import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import backgroundImage from '../assets/images/bg-pattern.png'
import { motion } from 'framer-motion'
import Layout from '../layouts/Layout'

const GetInTouch = () => {
  let history = useHistory()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&')
  }

  function submitForm(e) {
    const formData = { name, email, comment }
    e.preventDefault()

    fetch('/', {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...formData }),
    })
      .then((res) => {
        history.push('/thanks')
      })
      .catch((err) => alert('Oops! Something went wrong'))
  }

  return (
    <Layout>
      <motion.div
        className='container mx-auto pt-32 px-2 md:px-0'
        style={{ maxWidth: 680 }}
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: [0, 1],
          y: [-10, 0],
        }}
        transition={{
          duration: 0.3,
          ease: 'easeIn',
        }}
      >
        <h1 className='text-2xl font-semibold text-blue-900 mb-3'>
          We'd love to hear from you!
        </h1>

        <p className='text-blue-600 mb-12'>
          Feedback? Complaints? Feature requests? Questions? We want to hear
          them all!
          <br />
          <br />
          Our goal is to make Protege.dev the best place for junior developers
          to find remote work and the best way to do that is with input from
          you, the people we’re trying to serve!
        </p>

        <motion.div
          className='shadow-md border-t-4 border-teal-500'
          initial={{
            opacity: 0,
            y: -5,
          }}
          animate={{
            y: [-5, 0],
            opacity: [0, 1],
          }}
          transition={{
            delay: 0.15,
          }}
        >
          <h2
            style={{ backgroundImage: `url(${backgroundImage})` }}
            className='bg-cover text-blue-900 font-bold p-4 bg-blue-100 text-xl'
          >
            Get in Touch
          </h2>

          <form
            name='contact'
            onSubmit={submitForm}
            data-netlify-honeypot='bot-field'
            data-netlify='true'
          >
            <div className='p-4'>
              <div className='md:flex mb-3'>
                <div className='flex flex-col md:w-1/2 md:mr-6 mb-3 md:mb-0'>
                  <label
                    htmlFor='name'
                    className='text-blue-900 font-semibold mb-2'
                  >
                    Name
                  </label>

                  <input
                    id='name'
                    name='name'
                    className='input'
                    title='Users name'
                    type='text'
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='flex flex-col md:w-1/2'>
                  <label
                    htmlFor='email'
                    className='text-blue-900 font-semibold mb-2'
                  >
                    Email
                  </label>

                  <input
                    id='email'
                    name='email'
                    className='input'
                    title='Users email'
                    type='email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className='flex flex-col'>
                <label
                  htmlFor='comment'
                  className='text-blue-900 font-semibold mb-2'
                >
                  Comment
                </label>

                <textarea
                  id='comment'
                  name='comment'
                  className='input'
                  title='Users comment'
                  type='text'
                  as='textarea'
                  rows='8'
                  required
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <input type='hidden' name='form-name' value='contact' />

              <button
                type='submit'
                className='mt-6 btn btn-teal w-full md:w-32'
              >
                Send
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </Layout>
  )
}

export default GetInTouch
