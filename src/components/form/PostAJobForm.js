import React, { useState } from 'react'
import backgroundImage from '../../assets/images/bg-pattern.png'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import LogoUpload from './LogoUpload'

const PostAJobForm = ({
  id,
  label,
  receivingJobData,
  recievingLogo2,
  jobData,
  ...props
}) => {
  const [fileValue, setFileValue] = useState(undefined)

  function recievingLogo(logo) {
    setFileValue(logo)
    recievingLogo2(logo)
  }

  return (
    <div className='lg:w-3/5 mx-auto'>
      <Formik
        initialValues={{
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
        }}
        validationSchema={Yup.object({
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
          companyWebsite: Yup.string().required(
            'Please enter a company website.'
          ),
          companyEmail: Yup.string().required('Please enter a company email.'),
          companyDescription: Yup.string().required(
            'Please give a brief description of the company and culture.'
          ),
          companyLogo: Yup.mixed().required('Please provide a .png format image of your company logo')
            .test(file => file && file.type === 'image/png'),
          companyHQ: Yup.string().required(
            'Please provide a location for your office headquarters.'
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          receivingJobData(values)
        }}
      >
        {(formik) => (
          <Form data-cy='post-a-job-form' onSubmit={formik.handleSubmit}>
            <div className='shadow-md border-t-4 border-teal-500'>
              <h2
                style={{ backgroundImage: `url(${backgroundImage})` }}
                className='bg-cover text-blue-900 font-bold p-4 bg-blue-100 text-xl'
              >
                About the Role
              </h2>

              <div className='p-4'>
                <div className='mb-3 flex flex-col'>
                  <label
                    htmlFor='job-title'
                    className='text-blue-900 font-semibold mb-2'
                  >
                    Job Title
                  </label>

                  <Field
                    id='job-title'
                    name='jobtitle'
                    className='input'
                    type='text'
                    autoComplete='off'
                  ></Field>

                  <ErrorMessage
                    name='jobtitle'
                    component='span'
                    className='input-error'
                  />
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
                      <Field
                        id='role-focus'
                        name='roleFocus'
                        className='input input-select rounded-none'
                        as='select'
                      >
                        <option value='' className='text-gray-300'>
                          Select One...
                        </option>

                        <option value='Front-end'>Front-end</option>

                        <option value='Back-end'>Back-end</option>

                        <option value='Full-stack'>Full-Stack</option>
                      </Field>
                    </div>

                    <ErrorMessage
                      name='roleFocus'
                      component='span'
                      className='input-error'
                    />
                  </div>

                  <div className='flex flex-col md:w-1/2 mb-3'>
                    <label
                      htmlFor='positionType'
                      className='text-blue-900 font-semibold'
                    >
                      Position Type
                    </label>

                    <span className='text-blue-500 text-xs mb-2 tracking-tight '>
                      Full-time, Part-time, or Contract?
                    </span>

                    <div className='select-wrap'>
                      <Field
                        id='position-type'
                        name='positionType'
                        className='input input-select rounded-none'
                        as='select'
                      >
                        <option value='' className='text-gray-300'>
                          Select One...
                        </option>
                        <option value='Full-time'>Full-time</option>
                        <option value='Part-time'>Part-time</option>
                        <option value='Contract'>contract</option>
                      </Field>
                    </div>

                    <ErrorMessage
                      name='positionType'
                      component='span'
                      className='input-error'
                    />
                  </div>
                </div>

                <div className='flex flex-col mb-3'>
                  <label
                    htmlFor='job-description'
                    className='text-blue-900 font-semibold mb-2'
                  >
                    Job Description
                  </label>

                  <Field
                    id='jobDescription'
                    name='jobDescription'
                    className='input'
                  >
                    {({ field }) => (
                      <ReactQuill
                        value={field.value}
                        onChange={field.onChange(field.name)}
                      />
                    )}
                  </Field>

                  <ErrorMessage
                    name='jobDescription'
                    component='span'
                    className='input-error'
                  />
                </div>

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

                  <Field
                    id='how-to-apply'
                    name='howToApply'
                    className='input'
                    type='text'
                    placeholder='http://'
                  ></Field>

                  <ErrorMessage
                    name='howToApply'
                    component='span'
                    className='input-error'
                  />
                </div>
              </div>
            </div>

            <div className='mt-16 shadow-md border-t-4 border-teal-500'>
              <div>
                <h2
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                  className='bg-cover text-blue-900 p-4 font-bold bg-blue-100 text-xl'
                >
                  About the Company
                </h2>

                <div className='p-4'>
                  <div className='md:flex mb-3'>
                    <div className='flex flex-col md:w-1/2 md:mr-6 mb-3 md:mb-0'>
                      <label
                        htmlFor='companyName'
                        className='text-blue-900 font-semibold mb-2'
                      >
                        Company Name
                      </label>

                      <Field
                        id='companyName'
                        name='companyName'
                        className='input'
                        title='name of the company'
                        type='text'
                      />

                      <ErrorMessage
                        name='companyName'
                        component='span'
                        className='input-error'
                      />
                    </div>

                    <div className='flex flex-col md:w-1/2'>
                      <label
                        htmlFor='companyWebsite'
                        className='text-blue-900 font-semibold mb-2'
                      >
                        Company Website
                      </label>

                      <Field
                        id='companyWebsite'
                        name='companyWebsite'
                        className='input'
                        title='url of the company'
                        type='url'
                        placeholder='http://'
                      />

                      <ErrorMessage
                        name='companyWebsite'
                        component='span'
                        className='input-error'
                      />
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

                      <Field
                        id='companyEmail'
                        name='companyEmail'
                        className='input'
                        type='email'
                      />

                      <ErrorMessage
                        name='companyEmail'
                        component='span'
                        className='input-error'
                      />
                    </div>

                    <div className='flex flex-col md:w-1/2 mb-3'>
                      <label
                        htmlFor='companyLogo'
                        className='text-blue-900 font-semibold mb-2'
                      >
                        Logo
                      </label>

                      {/* Logo Upload */}
                      <Field
                        name='companyLogo'
                        component={LogoUpload}
                        recievingLogo={recievingLogo}
                        value={fileValue}
                        setFieldValue={formik.setFieldValue}
                      />

                      <ErrorMessage
                        name='companyLogo'
                        component='span'
                        className='input-error'
                      />
                    </div>
                  </div>
                  <div className='flex flex-col mb-3'>
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
                        />
                      )}
                    </Field>

                    <ErrorMessage
                      name='companyDescription'
                      component='span'
                      className='input-error'
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label
                      htmlFor='companyHQ'
                      className='text-blue-900 font-semibold'
                    >
                      Company Headquarters
                    </label>

                    <span className='text-blue-500 text-xs tracking-tight mb-2'>
                      These are remote job listings, but where is your main
                      office?
                    </span>

                    <Field id='companyHQ' name='companyHQ' className='input' />

                    <ErrorMessage
                      name='companyHQ'
                      component='span'
                      className='input-error'
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              data-cy='next-step-button'
              type='submit'
              className='mt-6 btn btn-teal w-32'
            >
              Next Step
            </button>
          </Form>
          // );
        )}
      </Formik>
    </div>
  )
}

export default PostAJobForm
