import React, { useEffect, useState } from 'react'
import { storage } from '../firebase/firebase'

const JobTemplate = ({ logo, props }) => {
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
    h1: 'text-blue-500 font-bold text-xl',
    h2: 'text-blue-500 font-bold text-lg',
    h3: 'text-blue-500 font-bold text-md',
    a: 'text-teal-600 font-bold',
    p: 'text-blue-300',
    ol: 'list-decimal list-inside',
    ul: 'list-disc list-inside',
    li: 'pl-2 text-blue-300',
  }

  useEffect(() => {
    // Cleans up the text provided by QuillJS wysiwyg
    function styleChildren(children) {
      children.forEach((child) => {
        if (child.tagName === 'H1') {
          child.classList = quillStyle.h1
        }
        if (child.tagName === 'H2') {
          child.classList = quillStyle.h2
        }
        if (child.tagName === 'H3') {
          child.classList = quillStyle.h3
        }
        if (child.tagName === 'P') {
          child.classList = quillStyle.p
        }
        if (child.tagName === 'A') {
          child.classList = quillStyle.a
        }
        if (child.tagName === 'OL') {
          child.classList = quillStyle.ol
          let listItems = [...child.children]
          listItems.forEach((listItem) => {
            listItem.classList = quillStyle.li
          })
        }
        if (child.tagName === 'UL') {
          child.classList = quillStyle.ul
          let listItems = [...child.children]
          listItems.forEach((listItem) => {
            listItem.classList = quillStyle.li
          })
        }
        if (child.tagName === 'LI') {
          child.classList = quillStyle.li
        }
      })
    }
    var jobDesc = document.getElementById('jobDesc')
    var jobChildren = [...jobDesc.children]
    styleChildren(jobChildren)
    var companyDesc = document.getElementById('companyDesc')
    var companyChildren = [...companyDesc.children]
    styleChildren(companyChildren)

    // Setting Logo in new job post preview
    readLogo(logo)

    // Retrieve logo to display in live job posting
    retrieveLogo()
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
              className='text-blue-500 font-bold text-3xl'
            >
              {props.jobTitle}
            </h2>

            <div
              data-cy='role-focus-and-position-type'
              className='text-gray-600 uppercase tracking-tight text-md mb-6'
            >
              {props.roleFocus} • {props.positionType}
            </div>

            <h3
              data-cy='job-description-title'
              className='text-blue-500 font-bold text-2xl mb-4'
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
              className='text-blue-500 font-bold text-2xl mb-4'
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
                className='text-blue-500 font-bold text-lg mb-3'
              >
                {props.companyName}
              </h4>

              <div className='uppercase text-blue-500 tracking-tight text-md'>
                <a
                  data-cy='company-website'
                  className='underline'
                  href={props.companyWebsite}
                >
                  <p className='opacity-75 hover:opacity-100'>Visit website</p>
                </a>

                <a
                  data-cy='company-email'
                  className='underline'
                  href={`mailto:${props.companyEmail}`}
                >
                  <p className='opacity-75 hover:opacity-100'>Contact email</p>
                </a>
                <a data-cy='how-to-apply' href={props.howToApply}>
                  <button className='hidden md:block btn btn-teal mt-8 w-full'>
                    Apply
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <a data-cy='how-to-apply-bottom' href={props.howToApply}>
            <button className='btn btn-teal mt-8 w-full md:w-auto'>
              Apply
            </button>
          </a>
        </div>
      </div>
    </>
  )
}

export default JobTemplate
