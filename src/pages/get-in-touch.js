import React from 'react'
import backgroundImage from '../assets/images/bg-pattern.png'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const GetInTouch = () => (
  <div
    className='container mx-auto pt-32 px-2 md:px-0'
    style={{ maxWidth: 680 }}
  >
    <h1 className='text-2xl font-bold text-blue-500 mb-3'>
      We'd love to hear from you!
    </h1>

    <p className='text-blue-200 mb-12'>
      Feeback? Complaints? Feature requests? Questions? We want to hear them
      all!
      <br />
      <br />
      Our goal is to make Protege.dev the best place for junior developers to
      find remote work and the best way to do that is with input from you, the
      people we’re trying to serve!
    </p>

    <div className='shadow-md border-t-4 border-teal-500'>
      <h2
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className='bg-cover text-blue-500 font-bold p-4 bg-blue-100 text-xl'
      >
        Get in Touch
      </h2>

      <Formik
        initialValues={{
          name: '',
          email: '',
          comments: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('You gotta let us know who you are!'),
          email: Yup.string().required(
            'What email can we follow up with you at?'
          ),
          comment: Yup.string().required(
            'Oops! Looks like you forgot to leave your comment.'
          ),
        })}
      >
        {(formik) => (
          <Form name='contact' method='post' data-netlify='true'>
            <div className='p-4'>
              <div className='md:flex mb-3'>
                <div className='flex flex-col md:w-1/2 md:mr-6 mb-3 md:mb-0'>
                  <label
                    htmlFor='name'
                    className='text-blue-500 font-bold mb-2'
                  >
                    Name
                  </label>

                  <Field
                    id='name'
                    name='name'
                    className='input'
                    title='name of the company'
                    type='text'
                  />

                  <ErrorMessage
                    name='name'
                    component='span'
                    className='input-error'
                  />
                </div>

                <div className='flex flex-col md:w-1/2'>
                  <label
                    htmlFor='email'
                    className='text-blue-500 font-bold mb-2'
                  >
                    Email
                  </label>

                  <Field
                    id='email'
                    name='email'
                    className='input'
                    title='url of the company'
                    type='email'
                  />

                  <ErrorMessage
                    name='email'
                    component='span'
                    className='input-error'
                  />
                </div>
              </div>

              <div className='flex flex-col'>
                <label
                  htmlFor='comment'
                  className='text-blue-500 font-bold mb-2'
                >
                  Comment
                </label>

                <Field
                  id='comment'
                  name='comment'
                  className='input'
                  title='Users comment'
                  type='text'
                  as='textarea'
                  rows='8'
                />

                <ErrorMessage
                  name='comment'
                  component='span'
                  className='input-error'
                />
              </div>
              <button
                type='submit'
                className='mt-6 btn btn-teal w-full md:w-32'
              >
                Send
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
)

export default GetInTouch
