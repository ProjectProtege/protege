import React, { useEffect, useState } from 'react'
import { storage } from '../firebase/firebase'
import { useLocation } from 'react-router-dom'

const JobTemplate = ({ logo, props }) => {
  let { pathname } = useLocation()
  const isPreview = pathname.indexOf('/job-board/') !== 0

  const [companyLogo, setCompanyLogo] = useState(undefined)

  function readLogo(logo) {
    let reader = new FileReader()
    let file = logo
    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setCompanyLogo(reader.result)
      }
    }
  }

  function retrieveLogo() {
    storage
      .ref('images')
      .child(props.companyLogo)
      .getDownloadURL()
      .then((url) => {
        setCompanyLogo(url)
      })
  }

  const quillStyle = {
    H1: 'text-blue-900 font-semibold text-xl',
    H2: 'text-blue-900 font-semibold text-lg',
    H3: 'text-blue-900 font-semibold text-md',
    A: 'text-teal-600 font-semibold',
    P: 'text-blue-700',
    OL: 'list-decimal list-inside',
    UL: 'list-disc list-inside',
    LI: 'pl-2 text-blue-700',
  }

  useEffect(() => {
    // Cleans up the text provided by QuillJS wysiwyg
    function styleChildren(children) {
      children.forEach((child) => {
        const childTag = child.tagName
        child.style = ''
        child.classList = quillStyle[childTag]
        if (child.hasChildNodes()) {
          const grandChildren = [...child.children]
          styleChildren(grandChildren)
        }
      })
    }
    const jobDescription = document.getElementById('jobDesc')
    const jobChildren = [...jobDescription.children]
    styleChildren(jobChildren)
    const companyDescription = document.getElementById('companyDesc')
    const companyChildren = [...companyDescription.children]
    styleChildren(companyChildren)

    if (isPreview) {
      // Setting Logo in new job post preview
      readLogo(logo)
    } else {
      // Retrieve logo to display in live job posting
      retrieveLogo()
    }
  })

  function createMarkup(text) {
    return { __html: text }
  }

  return (
    <>
      <div className='mx-auto container'>
        <div className='md:flex justify-center'>
          <div className='md:w-3/4 md:pr-12'>
            <h2
              data-cy='job-title'
              className='text-blue-900 font-bold text-3xl'
            >
              {props.jobtitle}
            </h2>

            <div
              data-cy='role-focus-and-position-type'
              className='text-blue-600 uppercase tracking-tight text-md mb-6'
            >
              {props.roleFocus} • {props.positionType}
            </div>

            <h3
              data-cy='job-description-title'
              className='text-blue-900 font-semibold text-2xl mb-4'
            >
              Job Description
            </h3>

            <div
              data-cy='job-description'
              id='jobDesc'
              dangerouslySetInnerHTML={createMarkup(props.jobDescription)}
              className='mb-6'
            ></div>

            <h4
              data-cy='company-description-title'
              className='text-blue-900 font-semibold text-2xl mb-4'
            >
              About {props.companyName}
            </h4>

            <div
              data-cy='company-description'
              className='mt-2 text-blue-300'
              id='companyDesc'
              dangerouslySetInnerHTML={createMarkup(props.companyDescription)}
            ></div>
          </div>
          <div className='md:w-1/4 mt-8 text-center md:text-left'>
            <div className='bg-gray-200 p-4'>
              {companyLogo ? (
                <div className='w-2/3 mx-auto md:mx-0 mb-6 md:w-1/2 bg-white p-4 rounded overflow-hidden shadow-md'>
                  <img
                    data-cy='company-logo'
                    id='companyLogo'
                    className='w-full'
                    src={companyLogo}
                    alt={`${props.companyName} logo`}
                  />
                </div>
              ) : null}

              <h4
                data-cy='company-name-sidebar'
                className='text-blue-900 font-semibold text-lg mb-3'
              >
                {props.companyName}
              </h4>

              <div className='uppercase text-blue-900 tracking-tight text-md'>
                <a
                  data-cy='company-website'
                  className='underline'
                  href={props.companyWebsite}
                >
                  <p className='opacity-75 hover:opacity-100'>Visit website</p>
                </a>
                <a data-cy='how-to-apply' href={props.howToApply}>
                  <button
                    disabled={isPreview}
                    className={'hidden md:block btn btn-teal mt-8 w-full' + (isPreview ? ' btn-disabled' : '')}>
                    Apply
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <a data-cy='how-to-apply-bottom' href={props.howToApply}>
            <button
              disabled={isPreview}
              className={'btn btn-teal mt-8 w-full md:w-auto' + (isPreview ? ' btn-disabled' : '')}>
              Apply
            </button>
          </a>
        </div>
      </div>
    </>
  )
}

export default JobTemplate
