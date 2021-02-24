import { useState } from 'react'
import { useRouter } from 'next/router'
import FormCard from 'components/global/FormCard'

const GetInTouch = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join('&')
  }

  function submitForm(e) {
    const formData = { name, email, comment }
    e.preventDefault()

    fetch('/', {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', formData }),
    })
      .then((res) => {
        router.push('/thanks')
      })
      .catch((err) => alert('Oops! Something went wrong'))
  }

  return (
    <div className='container max-w-screen-xl m-auto align-middle sm:max-w-screen-lg'>
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

      <FormCard title='Get in touch'>
        <form
          name='contact'
          onSubmit={submitForm}
          data-netlify-honeypot='bot-field'
          data-netlify='true'
        >
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
                  className='mb-2 font-semibold text-blue-900'
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
                className='mb-2 font-semibold text-blue-900'
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
              />
            </div>

            <input type='hidden' name='form-name' value='contact' />

            <button
              type='submit'
              className='w-full mt-6 btn btn-teal md:w-auto'
            >
              Send
            </button>
          </div>
        </form>
      </FormCard>
    </div>
  )
}

export default GetInTouch
