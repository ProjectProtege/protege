import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import { useJobForm } from 'store/job-post_store'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
import FormCard from 'components/global/FormCard'
import LogoUpload from './LogoUpload'

const PostAJobForm = ({ jobData }) => {
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
    companyLogo: Yup.mixed()
      .required('Please provide a .png format image of your company logo')
      .test((file) => file && file.type === 'image/png'),
    companyHQ: Yup.string().required(
      'Please provide a location for your office headquarters.'
    ),
  })

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(Schema),
    mode: 'onChange',
    defaultValues: {
      jobtitle: jobData ? `${jobData.jobtitle}` : '',
      roleFocus: jobData ? `${jobData.roleFocus}` : '',
      positionType: jobData ? `${jobData.positionType}` : '',
      jobDescription: jobData ? `${jobData.jobDescription}` : '',
      howToApply: jobData ? `${jobData.howToApply}` : '',
      companyName: jobData ? `${jobData.companyName}` : '',
      companyWebsite: jobData ? `${jobData.companyWebsite}` : '',
      companyEmail: jobData ? `${jobData.companyEmail}` : '',
      companyLogo: jobData ? `${jobData.companyLogo}` : '',
      companyDescription: jobData ? `${jobData.companyDescription}` : '',
      companyHQ: jobData ? `${jobData.companyHQ}` : '',
    },
  })

  const setForm = useJobForm((s) => s.form)
  const [fileValue, setFileValue] = useState(undefined)
  const [linkType, setLinkType] = useState('url')
  const [placeholder, setPlaceholder] = useState('')

  function recievingLogo(logo) {
    setFileValue(logo)
    // recievingLogo2(logo)
  }

  useEffect(() => {
    if (linkType === 'url') {
      setPlaceholder('http://')
    } else {
      setPlaceholder('mailto:')
    }
  }, [linkType])

  function handleChange(e) {
    setLinkType(e.target.value)
  }

  function handleFormEntry() {
    console.log('bazinga')
  }

  return (
    <div className='lg:w-3/5 mx-auto'>
      <form data-cy='post-a-job-form' onSubmit={handleSubmit(handleFormEntry)}>
        <FormCard title='About the Job' className='mb-16'>
          <div className='p-4'>
            <div className='mb-3 flex flex-col'>
              <label
                htmlFor='job-title'
                className='text-blue-900 font-semibold mb-2'
              >
                Job Title
              </label>

              <input
                id='jobTitle'
                name='jobtitle'
                ref={register}
                className='input'
                type='text'
                autoComplete='off'
              />

              <p name='jobtitle' component='span' className='input-error'>
                {errors.jobtitle && errors.jobtitle.message}
              </p>
            </div>

            <div className='md:flex'>
              <div className='flex flex-col md:w-1/2 mb-3 md:mr-6'>
                <label
                  htmlFor='role-focus'
                  className='text-blue-900 font-semibold'
                >
                  Role Focus
                </label>

                <span className='text-blue-500 text-xs mb-2 tracking-tight '>
                  Frontend, Backend, Full-Stack
                </span>

                <div className='select-wrap'>
                  <select
                    id='role-focus'
                    name='roleFocus'
                    ref={register}
                    className='input input-select rounded-none'
                  >
                    <option value='' className='text-gray-300'>
                      Select One...
                    </option>

                    <option value='Front-end'>Front-end</option>

                    <option value='Back-end'>Back-end</option>

                    <option value='Full-stack'>Full-Stack</option>
                  </select>
                </div>

                <p name='roleFocus' component='span' className='input-error'>
                  {errors.roleFocus && errors.roleFocus.message}
                </p>
              </div>

              <div className='flex flex-col md:w-1/2 mb-3'>
                <label
                  htmlFor='position-type'
                  className='text-blue-900 font-semibold'
                >
                  Position Type
                </label>

                <span className='text-blue-500 text-xs mb-2 tracking-tight '>
                  Full-time, Part-time, or Contract?
                </span>

                <div className='select-wrap'>
                  <select
                    id='position-type'
                    name='positionType'
                    className='input input-select rounded-none'
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

                <p name='positionType' component='span' className='input-error'>
                  {errors.positionType && errors.positionType.message}
                </p>
              </div>
            </div>

            {/* <div className='flex flex-col mb-3'>
              <label
                htmlFor='job-description'
                className='text-blue-900 font-semibold mb-2'
              >
                Job Description
              </label>

              {({ field }) => (
                <ReactQuill
                  value={field.value}
                  onChange={field.onChange(field.name)}
                  modules={{ keyboard: { bindings: { tab: false } } }}
                />
              )}
            </div> */}

            <div className='flex flex-col'>
              <label
                htmlFor='how-to-apply'
                className='text-blue-900 font-semibold'
              >
                How To Apply
              </label>

              <span className='text-blue-500 text-xs tracking-tight mb-2'>
                Email Address or link to 3rd party application page
              </span>

              <div className='text-sm mb-3 text-blue-600'>
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
                <label className=' text-blue-800'>
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

              <p name='howToApply' component='span' className='input-error'>
                {errors.howToApply && errors.howToApply.message}
              </p>
            </div>
          </div>
        </FormCard>

        <FormCard title='About the Company'>
          <div className='p-4'>
            <div className='md:flex mb-3'>
              <div className='flex flex-col md:w-1/2 md:mr-6 mb-3 md:mb-0'>
                <label
                  htmlFor='companyName'
                  className='text-blue-900 font-semibold mb-2'
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

                <p name='companyName' component='span' className='input-error'>
                  {errors.companyName && errors.companyName.message}
                </p>
              </div>

              <div className='flex flex-col md:w-1/2'>
                <label
                  htmlFor='companyWebsite'
                  className='text-blue-900 font-semibold mb-2'
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
                >
                  {errors.companyWebsite && errors.companyWebsite.message}
                </p>
              </div>
            </div>

            <div className='md:flex'>
              <div className='flex flex-col md:w-1/2 md:mr-6 mb-3'>
                <label
                  htmlFor='companyEmail'
                  className='text-blue-900 font-semibold mb-2'
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

                <p name='companyEmail' component='span' className='input-error'>
                  {errors.companyEmail && errors.companyEmail.message}
                </p>
              </div>

              <div className='flex flex-col md:w-1/2 mb-3'>
                {/* TODO: Make this work */}
                <label
                  htmlFor='companyLogo'
                  className='text-blue-900 font-semibold mb-2'
                >
                  Logo
                </label>

                <LogoUpload />

                <p name='companyLogo' component='span' className='input-error'>
                  {errors.companyLogo && errors.companyLogo.message}
                </p>
              </div>
            </div>

            {/* <div className='flex flex-col mb-3'>
              <label
                htmlFor='companyDescription'
                className='text-blue-900 font-semibold mb-2'
              >
                Company Description
              </label>

              <Field
                id='companyDescription'
                name='companyDescription'
                className='input'
              >
                {({ field }) => (
                  <ReactQuill
                    value={field.value}
                    onChange={field.onChange(field.name)}
                    modules={{ keyboard: { bindings: { tab: false } } }}
                  />
                )}
              </Field>

              <ErrorMessage
                name='companyDescription'
                component='span'
                className='input-error'
              />
            </div> */}

            <div className='flex flex-col'>
              <label
                htmlFor='companyHQ'
                className='text-blue-900 font-semibold'
              >
                Company Headquarters
              </label>

              <span className='text-blue-500 text-xs tracking-tight mb-2'>
                These are remote job listings, but where is your main office?
              </span>

              <input
                id='companyHQ'
                name='companyHQ'
                className='input'
                ref={register}
              />

              <p name='companyHQ' component='span' className='input-error'>
                {errors.companyHQ && errors.companyHQ.message}
              </p>
            </div>
          </div>
        </FormCard>
        <button
          data-cy='next-step-button'
          type='submit'
          className='mt-6 btn btn-teal w-32'
        >
          Next Step
        </button>

        <DevTool control={control} />
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
    companyLogo: PropTypes.string,
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
    companyLogo: '',
    companyDescription: '',
    companyHQ: '',
  },
}

export default PostAJobForm
