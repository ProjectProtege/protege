import React, {useState} from 'react';
import backgroundImage from "../../assets/images/bg-pattern.png";

import * as Yup from "yup";
import { Formik, Form, Field, useField, ErrorMessage} from "formik";

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

import LogoUpload from "./LogoUpload"


// This can be refactored into mini-components at somepoint using something like below. Also add `useField` into the formik import statement: 
// const MyTextInput = ({ label, ...props }) => {
//     // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//     // which we can spread on <input> and also replace ErrorMessage entirely.
//     const [field, meta] = useField(props);
//     return (
//       <>
//         <label htmlFor={props.id || props.name}>{label}</label>
//         <input className="text-input" {...field} {...props} />
//         {meta.touched && meta.error ? (
//           <div className="error">{meta.error}</div>
//         ) : null}
//       </>
//     );
//   };


const PostAJobForm = ({ id, label, receivingJobData, recievingLogo2, ...props}) => {

  const [fileValue, setFileValue] = useState(undefined)

  function recievingLogo(logo){
    console.log('logo recieved')
    console.log(logo)
    setFileValue(logo)
    recievingLogo2(logo)
  }

  return (
    <div className="lg:w-3/5 mx-auto">
        <Formik
          initialValues={{
            // jobTitle: 'Junior Dev',
            // roleFocus: 'Frontend',
            // positionType: 'Full-time',
            // jobDescription: 'This is a job Description',
            // howToApply: 'https://indeed.com/?company=SnakeholeLounge',
            // companyName: 'Snakehole Lounge',
            // companyWebsite: 'https://SnakeholeLounge.com',
            // companyEmail: 'tom@SnakeholeLounge.com',
            // companyDescription: 'This is a company description.',
            // companyLogo: undefined,
            jobTitle: '',
            roleFocus: '',
            positionType: '',
            jobDescription: '',
            howToApply: '',
            companyName: '',
            companyWebsite: '',
            companyEmail: '',
            companyDescription: '',
          }}
          validationSchema={Yup.object({
            jobTitle: Yup.string().required("Job title is a required field."),
            roleFocus: Yup.string().required("Please select a focus area."),
            positionType: Yup.string().required("Please select a position type."),
            jobDescription: Yup.string().required("Please give a description of the job and responsibilities."),
            howToApply: Yup.string().required("Please provide a way for candidates to apply."),
            companyName: Yup.string().required("Please enter a company name."),
            companyWebsite: Yup.string().required("Please enter a company website."),
            companyEmail: Yup.string().required("Please enter a company email."),
            companyDescription: Yup.string().required("Please give a brief description of the company and culture."),
            companyLogo: Yup.mixed()
            // .required('need a logo!')
            //  .test('fileSize', "File Size is too large", value => value.size <= FILE_SIZE) .test('fileType', "Unsupported File Format", value => SUPPORTED_FORMATS.includes(value.type) )
          })}
          onSubmit={(values, { setSubmitting }) => {
            receivingJobData(values)
          }}

        >
          {formik => (
              <Form onSubmit={formik.handleSubmit}>
                <div className="shadow-md border-t-4 border-teal-500">
                  <h2
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                    className="bg-cover text-blue-500 font-bold p-4 bg-blue-100 text-xl"
                  >
                    About the Role
                  </h2>
                  <div className="p-4">
                    <div className="mb-3 flex flex-col">
                      <label
                        htmlFor="job-title"
                        className="text-blue-500 font-bold mb-2"
                      >
                        Job Title
                      </label>
                      <Field
                        id="job-title"
                        name="jobTitle"
                        className="input"
                        type="text"
                        autoComplete="off"
                      ></Field>
                      <ErrorMessage
                        name="jobTitle"
                        component="span"
                        className="input-error"
                      />
                    </div>

                    <div className="md:flex">
                      <div className="flex flex-col md:w-1/2 mb-3 md:mr-6">
                        <label
                          htmlFor="role-focus"
                          className="text-blue-500 font-bold"
                        >
                          Role Focus
                        </label>

                        <span className="text-blue-200 text-xs mb-2 tracking-tight ">
                          Frontend, Backend, Full-Stack
                        </span>

                        <Field
                          id="role-focus"
                          name="roleFocus"
                          className="input"
                          as="select"
                        >
                          <option value="" className="text-gray-300">Select One...</option>
                          <option value="frontend">Frontend</option>
                          <option value="backend">Backend</option>
                          <option value="full-stack">Full-Stack</option>
                        </Field>
                        <ErrorMessage
                          name="roleFocus"
                          component="span"
                          className="input-error"
                        />
                      </div>

                      <div className="flex flex-col md:w-1/2 mb-3">
                        <label
                          htmlFor="positionType"
                          className="text-blue-500 font-bold"
                        >
                          Position Type
                        </label>

                            <span className="text-blue-200 text-xs mb-2 tracking-tight ">
                            Full-time, Part-time, or Contract?
                            </span>
                            <Field
                                id='position-type' name='positionType' className='input' as='select'
                            >
                                <option value="" className="text-gray-300">Select One...</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">contract</option>
                            </Field>
                          <ErrorMessage
                            name="positionType"
                            component="span"
                            className="input-error"
                          />

                      </div>
                    </div>

                    <div className="flex flex-col mb-3">
                      <label
                        htmlFor="job-description"
                        className="text-blue-500 font-bold mb-2"
                      >
                        Job Description
                      </label>
                        <Field
                            id="jobDescription"
                            name="jobDescription"
                            className="input"
                        >
                          {({field}) => 
                            <ReactQuill value={field.value} onChange={field.onChange(field.name)}/>
                          }
                        </Field>
                        <ErrorMessage
                          name="jobDescription"
                          component="span"
                          className="input-error"
                        />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="how-to-apply"
                        className="text-blue-500 font-bold"
                      >
                        How To Apply
                      </label>
                      <span className="text-blue-200 text-xs tracking-tight mb-2">
                        Email Address or link to 3rd party application page
                      </span>
                      <Field
                        id="how-to-apply"
                        name="howToApply"
                        className="input"
                        type="text"
                      ></Field>
                      <ErrorMessage
                        name="howToApply"
                        component="span"
                        className="input-error"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-16 shadow-md border-t-4 border-teal-500">
                  <div>
                    <h2
                      style={{ backgroundImage: `url(${backgroundImage})` }}
                      className="bg-cover text-blue-500 p-4 font-bold bg-blue-100 text-xl"
                    >
                      About the Company
                    </h2>

                    <div className="p-4">
                      <div className="md:flex mb-3">
                        <div className="flex flex-col md:w-1/2 md:mr-6 mb-3 md:mb-0">
                          <label
                            htmlFor="companyName"
                            className="text-blue-500 font-bold mb-2"
                          >
                            Company Name
                          </label>
                          <Field
                            id="companyName"
                            name="companyName"
                            className="input"
                            title="name of the company"
                            type="text"
                          />
                          <ErrorMessage
                            name="companyName"
                            component="span"
                            className="input-error"
                          />
                        </div>

                        <div className="flex flex-col md:w-1/2">
                          <label
                            htmlFor="companyWebsite"
                            className="text-blue-500 font-bold mb-2"
                          >
                            Company Website
                          </label>
                          <Field
                            id="companyWebsite"
                            name="companyWebsite"
                            className="input"
                            title="url of the company"
                            type="url"
                          />
                          <ErrorMessage
                            name="companyWebsite"
                            component="span"
                            className="input-error"
                          />
                        </div>
                      </div>
                      <div className="md:flex">
                        <div className="flex flex-col md:w-1/2 md:mr-6 mb-3">
                          <label
                            htmlFor="companyEmail"
                            className="text-blue-500 font-bold mb-2"
                          >
                            Email
                          </label>
                          <Field
                            id="companyEmail"
                            name="companyEmail"
                            className="input"
                            type="email"
                          />
                          <ErrorMessage
                            name="companyEmail"
                            component="span"
                            className="input-error"
                          />
                        </div>
                        <div className="flex flex-col md:w-1/2 mb-3">

                          <label
                            htmlFor="companyEmail"
                            className="text-blue-500 font-bold mb-2"
                          >
                            Logo
                          </label>
                          {/* Logo Upload */}
                          <Field 
                            name="companyLogo"
                            component={LogoUpload}
                            recievingLogo={recievingLogo}
                            value={fileValue}
                          />
                          <ErrorMessage
                            name="companyLogo"
                            component="span"
                            className="input-error"
                          />

                        </div>
                        
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="companyDescription"
                          className="text-blue-500 font-bold mb-2"
                        >
                          Company Description
                        </label>
                        <Field
                            id="companyDescription"
                            name="companyDescription"
                            className="input"
                        >
                          {({field}) => 
                            <ReactQuill value={field.value} onChange={field.onChange(field.name)}/>
                          }
                        </Field>
                        <ErrorMessage
                          name="companyDescription"
                          component="span"
                          className="input-error"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button type='submit' className="mt-6 btn btn-teal w-32">Next Step</button>
              </Form>
            // );
          )}
        </Formik>
      </div>

  )
}

export default PostAJobForm