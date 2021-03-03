import { useState } from 'react'
import { useRouter } from 'next/router'
import FormCard from 'components/global/FormCard'
import axios from 'axios'
// import LoadingSpinner from 'components/LoadingSpinner'

// React Hook Forms
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const GetInTouch = () => {
  const router = useRouter()
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  })
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    comment: '',
  })

  const Schema = yup.object().shape({
    name: yup.string().required('Name is a required field.'),
    email: yup
      .string()
      .email('This must be a valid email address.')
      .required('Email is a required field.'),
    comment: yup.string().required('A comment is required.'),
  })

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onBlur',
  })

  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      })
      setInputs({
        name: '',
        email: '',
        comment: '',
      })
    } else {
      setStatus({
        info: { error: true, msg: msg },
      })
    }
  }

  const onSubmit = (data) => {
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }))
    axios({
      method: 'POST',
      url: 'https://formspree.io/f/mqkgovpl',
      data: encode(data),
    })
      .then((response) => {
        handleServerResponse(true, 'Your message has been submitted')
        router.push('/thanks')
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error)
      })
  }

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join('&')
  }

  return (
    <div className='container' style={{ maxWidth: 680 }}>
      <h1 className='mb-3 text-2xl text-blue-900'>
        We&apos;d love to hear from you!
      </h1>

      <p className='mb-12 text-blue-700' style={{ maxWidth: 680 }}>
        Feedback? Complaints? Feature requests? Questions? We want to hear them
        all!
        <br />
        <br />
        Our goal is to make Protegé.dev the best place for junior developers to
        find remote work and the best way to do that is with input from you, the
        people we’re trying to serve!
      </p>

      <form autoComplete='on' onSubmit={handleSubmit(onSubmit)}>
        <FormCard title='Get in touch'>
          <div className='p-4'>
            <div className='mb-3 md:flex'>
              <div className='flex flex-col mb-3 md:w-1/2 md:mr-6 md:mb-0'>
                <label
                  htmlFor='name'
                  className='mb-2 font-semibold text-blue-900'
                >
                  Name
                </label>

                <input
                  id='name'
                  name='name'
                  ref={register}
                  className='input'
                  title='Users name'
                  type='text'
                  required
                  // onChange={(e) => setName(e.target.value)}
                />
                <p className='input-error'>
                  {errors.name && errors.name.message}
                </p>
              </div>

              <div className='flex flex-col md:w-1/2'>
                <label
                  htmlFor='email'
                  className='mb-2 font-semibold text-blue-900'
                >
                  Email
                </label>

                <input
                  id='email'
                  name='email'
                  ref={register}
                  className='input'
                  title='Users email'
                  type='email'
                  required
                  // onChange={(e) => setEmail(e.target.value)}
                />
                <p className='input-error'>
                  {errors.email && errors.email.message}
                </p>
              </div>
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='comment'
                className='mb-2 font-semibold text-blue-900'
              >
                Comment
              </label>

              <textarea
                id='comment'
                name='comment'
                ref={register}
                className='input'
                title='Users comment'
                type='text'
                as='textarea'
                rows='8'
                required
                // onChange={(e) => setComment(e.target.value)}
              />
              <p className='input-error'>
                {errors.comment && errors.comment.message}
              </p>
            </div>

            <button
              type='submit'
              className='w-full mt-6 btn btn-teal md:w-auto'
            >
              {/* {!status.submitting
                ? !status.submitted
                  ? 'Send'
                  : 'Submitted'
                : (<LoadingSpinner /> 'Submitting...') } */}
              {/* <LoadingSpinner loading='true' /> */}
              {/* {status.submitting ? <LoadingSpinner loading='true' /> : null} */}
              {status.submitting ? 'Submitting' : 'Send'}
            </button>
          </div>
        </FormCard>
      </form>
    </div>
  )
}

export default GetInTouch
