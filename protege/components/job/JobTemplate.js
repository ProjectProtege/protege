/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-danger */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { storage } from 'utils/db'
import Image from 'next/image'

const JobTemplate = ({ logo, props }) => {
  const router = useRouter()

  const isPreview = router.pathname.indexOf('/job-board/') !== 0

  const {
    howToApply,
    jobDescription,
    companyDescription,
    companyName,
    companyWebsite,
    roleFocus,
    jobtitle,
    positionType,
    companyLogo,
  } = props

  // const [companyLogoFile, setCompanyLogoFile] = useState(undefined)
  const [isAdmin, setIsAdmin] = useState(false)

  // function readLogo(logoFile) {
  //   const reader = new FileReader()
  //   const file = logoFile
  //   if (file) {
  //     reader.readAsDataURL(file)
  //     reader.onloadend = () => {
  //       setCompanyLogoFile(reader.result)
  //     }
  //   }
  // }

  function retrieveLogo() {
    // console.log('safe')
    storage
      .ref('images')
      .child(props.companyLogo)
      .getDownloadURL()
      .then((url) => {
        setCompanyLogoFile(url)
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

  function checkAdmin() {
    return router.pathname === '/admin' ? setIsAdmin(true) : setIsAdmin(false)
  }

  useEffect(() => {
    // Cleans up the text provided by QuillJS wysiwyg
    function styleChildren(children) {
      children.forEach((child) => {
        const el = child
        const childTag = child.tagName

        el.style = ''
        el.classList = quillStyle[childTag]
        if (child.hasChildNodes()) {
          const grandChildren = [...child.children]
          styleChildren(grandChildren)
        }
      })
    }

    const jobDescriptionParent = document.getElementById('jobDesc')

    const jobChildren = [...jobDescriptionParent.children]
    styleChildren(jobChildren)

    const companyDescriptionParent = document.getElementById('companyDesc')

    const companyChildren = [...companyDescriptionParent.children]
    styleChildren(companyChildren)

    // if (isPreview && logo !== null) {
    //   readLogo(logo)
    // } else {
    //   retrieveLogo()
    // }

    checkAdmin()
  }, [])

  function createMarkup(text) {
    return { __html: text }
  }

  return (
    <>
      <div className='mx-auto container'>
        <div className='md:flex justify-center'>
          <div className={`${isAdmin ? 'w-full' : 'md:w-3/4'} md:pr-16`}>
            <h2
              data-cy='job-title'
              className='text-blue-900 font-bold text-3xl'
            >
              {jobtitle}
            </h2>

            <div
              data-cy='role-focus-and-position-type'
              className='text-blue-600 uppercase tracking-tight text-md mb-6'
            >
              {roleFocus}
              <span>•</span>
              {positionType}
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
              dangerouslySetInnerHTML={createMarkup(jobDescription)}
              className='rich-text-content mb-6'
            />

            <h4
              data-cy='company-description-title'
              className='text-blue-900 font-semibold text-2xl mb-4'
            >
              About&nbsp;
              {companyName}
            </h4>

            <div
              data-cy='company-description'
              className='rich-text-content mt-2 text-blue-300'
              id='companyDesc'
              dangerouslySetInnerHTML={createMarkup(companyDescription)}
            />
          </div>

          {!isAdmin ? (
            <div className='md:w-1/4 mt-8 text-center md:text-left'>
              <div className='bg-gray-200 p-4'>
                {companyLogo ? (
                  <div className='relative w-2/3 md:w-auto mx-auto md:mx-0 mb-6 bg-white p-4 rounded overflow-hidden shadow-md'>
                    <Image
                      data-cy='company-logo'
                      id='companyLogo'
                      className='rounded-full'
                      src={companyLogo}
                      alt={`${companyName} logo`}
                      width={500}
                      height={500}
                      quality={100}
                    />
                  </div>
                ) : null}

                <h4
                  data-cy='company-name-sidebar'
                  className='text-blue-900 font-semibold text-lg mb-3'
                >
                  {companyName}
                </h4>

                <div className='uppercase text-blue-900 tracking-tight text-md'>
                  <a
                    data-cy='company-website'
                    className='underline'
                    href={companyWebsite}
                  >
                    <p className='opacity-75 hover:opacity-100'>
                      Visit website
                    </p>
                  </a>
                  <a data-cy='how-to-apply' href={howToApply}>
                    <button
                      disabled={isPreview}
                      className={`hidden md:block btn btn-teal mt-8 w-full
                        ${isPreview ? ' btn-disabled' : ''}`}
                      type='button'
                    >
                      Apply
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div>
          <a data-cy='how-to-apply-bottom' href={howToApply}>
            <button
              disabled={isPreview}
              className={`btn btn-teal mt-8 w-full md:w-auto ${
                isPreview ? ' btn-disabled' : ''
              }
              `}
              type='button'
            >
              Apply
            </button>
          </a>
        </div>
      </div>
    </>
  )
}

JobTemplate.propTypes = {
  logo: PropTypes.shape({}),
  props: PropTypes.shape({}).isRequired,
  howToApply: PropTypes.string,
  companyName: PropTypes.string,
  companyWebsite: PropTypes.string,
  roleFocus: PropTypes.string,
  jobtitle: PropTypes.string,
  positionType: PropTypes.string,
  jobDescription: PropTypes.string,
  companyDescription: PropTypes.string,
  companyLogo: PropTypes.string,
}

JobTemplate.defaultProps = {
  companyLogo: '',
  logo: {},
  howToApply: '',
  companyName: '',
  companyWebsite: '',
  roleFocus: '',
  jobtitle: '',
  positionType: '',
  jobDescription: '',
  companyDescription: '',
}

export default JobTemplate
