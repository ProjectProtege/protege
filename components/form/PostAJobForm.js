// React/Next imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'

// Lib imports
import { useJobForm } from 'store/job-post_store'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import 'react-quill/dist/quill.snow.css'

// Custom component imports
import FormCard from 'components/global/FormCard'

const SimpleFileUpload = dynamic(() => import('react-simple-file-upload'), {
  ssr: false,
})
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const PostAJobForm = ({ jobData }) => {
  const router = useRouter()
  const [logo, setLogo] = useState('')

  // Form and Status state from zustand
  const setForm = useJobForm((s) => s.setForm)
  const setStatus = useJobForm((s) => s.setStatus)
  const avatarFile = useJobForm((s) => s.avatarFile)

  // Form validation schema
  const Schema = Yup.object().shape({
    jobtitle: Yup.string().required('Job title is a required field.'),
    roleFocus: Yup.string().required('Please select a focus area.'),
    positionType: Yup.string().required('Please select a position type.'),
    jobDescription: Yup.string().required(
      'Please give a description of the job and responsibilities.'
    ),
    howToApply: Yup.string().required(
      'Please provide a way for candidates to apply.'
    ),
    companyName: Yup.string().required('Please enter a company name.'),
    companyWebsite: Yup.string().required('Please enter a company website.'),
    companyEmail: Yup.string().required('Please enter a company email.'),
    companyDescription: Yup.string().required(
      'Please give a brief description of the company and culture.'
    ),
    // avatar: Yup.mixed().required(
    //   'Please provide a .png format image of your company logo'
    // ),
    companyHQ: Yup.string().required(
      'Please provide a location for your office headquarters.'
    ),
  })

  // react-hook-form
  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      jobtitle: jobData.jobtitle,
      roleFocus: jobData.roleFocus,
      positionType: jobData.positionType,
      jobDescription: jobData.jobDescription,
      howToApply: jobData.howToApply,
      companyName: jobData.companyName,
      avatar: jobData.avatar,
      companyWebsite: jobData.companyWebsite,
      companyEmail: jobData.companyEmail,
      companyDescription: jobData.companyDescription,
      companyHQ: jobData.companyHQ,
    },
  })

  // used for 'How to apply' toggle
  const [linkType, setLinkType] = useState('url')
  const [placeholder, setPlaceholder] = useState('')

  // toggling placeholder for 'How to apply'
  useEffect(() => {
    if (linkType === 'url') {
      setPlaceholder('http://')
    } else {
      setPlaceholder('mailto:')
    }
  }, [linkType])

  // updating value of 'How to apply' radio buttons
  function handleChange(e) {
    setLinkType(e.target.value)
  }

  // Form submission event
  function handleFormEntry(data) {
    setForm({
      companyDescription: data.companyDescription,
      companyEmail: data.companyEmail,
      companyHQ: data.companyHQ,
      avatar: logo,
      companyName: data.companyName,
      companyWebsite: data.companyWebsite,
      howToApply: data.howToApply,
      jobDescription: data.jobDescription,
      jobtitle: data.jobtitle,
      positionType: data.positionType,
      roleFocus: data.roleFocus,
    })
    setStatus(2)
    router.push('/post-a-job?status=2')
  }

  function handleLogoUpload(url) {
    setLogo(url)
  }

  return (
    <div className='mx-auto lg:w-3/5'>
      <form data-cy='post-a-job-form' onSubmit={handleSubmit(handleFormEntry)}>
        <FormCard title='About the Job' className='mb-16'>
          <div className='p-4'>
            <div className='flex flex-col mb-3'>
              <label
                htmlFor='job-title'
                className='mb-2 font-semibold text-blue-900'
              >
                Job Title
              </label>

              <input
                id='jobtitle'
                name='jobtitle'
                ref={register}
                className='input'
                type='text'
                autoComplete='off'
              />

              <p
                name='jobtitle'
                component='span'
                className='input-error'
                role='alert'
              >
                {errors.jobtitle && errors.jobtitle.message}
              </p>
            </div>

            <div className='md:flex'>
              <div className='flex flex-col mb-3 md:w-1/2 md:mr-6'>
                <label
                  htmlFor='role-focus'
                  className='font-semibold text-blue-900'
                >
                  Role Focus
                </label>

                <span className='mb-2 text-xs tracking-tight text-blue-500 '>
                  Frontend, Backend, Full-Stack
                </span>

                <div className='select-wrap'>
                  <select
                    id='role-focus'
                    name='roleFocus'
                    ref={register}
                    className='input input-select '
                  >
                    <option value='' className='text-gray-300'>
                      Select One...
                    </option>

                    <option value='Front-end'>Front-end</option>

                    <option value='Back-end'>Back-end</option>

                    <option value='Full-stack'>Full-Stack</option>
                  </select>
                </div>

                <p
                  name='roleFocus'
                  component='span'
                  className='input-error'
                  role='alert'
                >
                  {errors.roleFocus && errors.roleFocus.message}
                </p>
              </div>

              <div className='flex flex-col mb-3 md:w-1/2'>
                <label
                  htmlFor='position-type'
                  className='font-semibold text-blue-900'
                >
                  Position Type
                </label>

                <span className='mb-2 text-xs tracking-tight text-blue-500 '>
                  Full-time, Part-time, or Contract?
                </span>

                <div className='select-wrap'>
                  <select
                    id='position-type'
                    name='positionType'
                    className='input input-select '
                    ref={register}
                  >
                    <option value='' className='text-gray-300'>
                      Select One...
                    </option>
                    <option value='Full-time'>Full-time</option>
                    <option value='Part-time'>Part-time</option>
                    <option value='Contract'>contract</option>
                  </select>
                </div>

                <p
                  name='positionType'
                  component='span'
                  className='input-error'
                  role='alert'
                >
                  {errors.positionType && errors.positionType.message}
                </p>
              </div>
            </div>

            <div className='flex flex-col mb-3'>
              <label
                htmlFor='job-description'
                className='mb-2 font-semibold text-blue-900'
              >
                Job Description
              </label>

              <Controller
                name='jobDescription'
                control={control}
                render={({ value, onChange }) => (
                  <ReactQuill
                    value={value}
                    onChange={onChange}
                    modules={{ keyboard: { bindings: { tab: false } } }}
                  />
                )}
              />

              <p
                name='jobDescription'
                component='span'
                className='input-error'
                role='alert'
              >
                {errors.jobDescription && errors.jobDescription.message}
              </p>
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='how-to-apply'
                className='font-semibold text-blue-900'
              >
                How To Apply
              </label>

              <span className='mb-2 text-xs tracking-tight text-blue-500'>
                Email Address or link to 3rd party application page
              </span>

              <div className='mb-3 text-sm text-blue-600'>
                <label className='mr-6 text-blue-800'>
                  <input
                    type='radio'
                    name='link-type'
                    className='mr-2'
                    value='url'
                    checked={linkType === 'url'}
                    onChange={handleChange}
                  />
                  URL
                </label>
                <label className='text-blue-800 '>
                  <input
                    type='radio'
                    name='linkType'
                    className='mr-2'
                    value='email'
                    checked={linkType === 'email'}
                    onChange={handleChange}
                  />
                  Email
                </label>
              </div>

              <input
                id='how-to-apply'
                name='howToApply'
                className='input'
                ref={register}
                type='text'
                placeholder={placeholder}
              />

              <p
                name='howToApply'
                component='span'
                className='input-error'
                role='alert'
              >
                {errors.howToApply && errors.howToApply.message}
              </p>
            </div>
          </div>
        </FormCard>

        <FormCard title='About the Company'>
          <div className='p-4'>
            <div className='mb-3 md:flex'>
              <div className='flex flex-col mb-3 md:w-1/2 md:mr-6 md:mb-0'>
                <label
                  htmlFor='companyName'
                  className='mb-2 font-semibold text-blue-900'
                >
                  Company Name
                </label>

                <input
                  id='companyName'
                  name='companyName'
                  className='input'
                  title='name of the company'
                  ref={register}
                  type='text'
                />

                <p
                  name='companyName'
                  component='span'
                  className='input-error'
                  role='alert'
                >
                  {errors.companyName && errors.companyName.message}
                </p>
              </div>

              <div className='flex flex-col md:w-1/2'>
                <label
                  htmlFor='companyWebsite'
                  className='mb-2 font-semibold text-blue-900'
                >
                  Company Website
                </label>

                <input
                  id='companyWebsite'
                  name='companyWebsite'
                  className='input'
                  title='url of the company'
                  type='text'
                  ref={register}
                  placeholder='https://'
                />

                <p
                  name='companyWebsite'
                  component='span'
                  className='input-error'
                  role='alert'
                >
                  {errors.companyWebsite && errors.companyWebsite.message}
                </p>
              </div>
            </div>

            <div className='md:flex'>
              <div className='flex flex-col mb-3 md:w-1/2 md:mr-6'>
                <label
                  htmlFor='companyEmail'
                  className='mb-2 font-semibold text-blue-900'
                >
                  Email
                </label>

                <input
                  id='companyEmail'
                  name='companyEmail'
                  className='input'
                  type='email'
                  ref={register}
                />

                <p
                  name='companyEmail'
                  component='span'
                  className='input-error'
                  role='alert'
                >
                  {errors.companyEmail && errors.companyEmail.message}
                </p>
              </div>

              <div className='flex flex-col mb-3 md:w-1/2'>
                {/* TODO: Make this work */}
                <label
                  htmlFor='avatar'
                  className='mb-2 font-semibold text-blue-900'
                >
                  Logo
                </label>

                <div className='grid-cols-2 gap-4 md:grid'>
                  <div className='mb-2 md:mb-0'>
                    <SimpleFileUpload
                      apiKey={process.env.SIMPLE_FILE_API_KEY}
                      preview
                      onSuccess={handleLogoUpload}
                      value={logo}
                    />
                    <a
                      href='https://simplefileupload.com'
                      className='text-blue-400'
                      style={{ fontSize: '10px' }}
                    >
                      Powered by:{' '}
                      <span className='underline'>Simple File Upload</span>
                    </a>
                  </div>

                  <span
                    data-cy='logo-upload-fileName'
                    className='text-xs tracking-tight text-blue-500'
                  >
                    Please provide a .jpg, .jpeg, or .png format of your
                    company&apos;s logo to be displayed with your job opening
                    listing.
                  </span>
                </div>

                {/* <LogoUpload
                  register={register}
                  receivingLogo2={receivingLogo2}
                /> */}

                <p
                  name='avatar'
                  component='span'
                  className='input-error'
                  role='alert'
                >
                  {errors.avatar && errors.avatar.message}
                </p>
              </div>
            </div>

            <div className='flex flex-col mb-3'>
              <label
                htmlFor='companyDescription'
                className='mb-2 font-semibold text-blue-900'
              >
                Company Description
              </label>

              <Controller
                name='companyDescription'
                control={control}
                render={({ value, onChange }) => (
                  <ReactQuill
                    value={value}
                    onChange={onChange}
                    modules={{ keyboard: { bindings: { tab: false } } }}
                  />
                )}
              />

              <p
                name='companyDescription'
                component='span'
                className='input-error'
                role='alert'
              >
                {errors.companyDescription && errors.companyDescription.message}
              </p>
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='companyHQ'
                className='font-semibold text-blue-900'
              >
                Company Headquarters
              </label>

              <span className='mb-2 text-xs tracking-tight text-blue-500'>
                These are remote job listings, but where is your main office?
              </span>

              <input
                id='companyHQ'
                name='companyHQ'
                className='input'
                ref={register}
              />

              <p
                name='companyHQ'
                component='span'
                className='input-error'
                role='alert'
              >
                {errors.companyHQ && errors.companyHQ.message}
              </p>
            </div>
          </div>
        </FormCard>
        <button
          data-cy='next-step-button'
          type='submit'
          className='w-32 mt-6 btn btn-teal'
        >
          Next Step
        </button>
      </form>
    </div>
  )
}

PostAJobForm.propTypes = {
  jobData: PropTypes.shape({
    jobtitle: PropTypes.string,
    roleFocus: PropTypes.string,
    positionType: PropTypes.string,
    jobDescription: PropTypes.string,
    howToApply: PropTypes.string,
    companyName: PropTypes.string,
    companyWebsite: PropTypes.string,
    companyEmail: PropTypes.string,
    avatar: PropTypes.string,
    companyDescription: PropTypes.string,
    companyHQ: PropTypes.string,
  }),
}

PostAJobForm.defaultProps = {
  jobData: {
    jobtitle: '',
    roleFocus: '',
    positionType: '',
    jobDescription: '',
    howToApply: '',
    companyName: '',
    companyWebsite: '',
    companyEmail: '',
    avatar: '',
    companyDescription: '',
    companyHQ: '',
  },
}

export default PostAJobForm
