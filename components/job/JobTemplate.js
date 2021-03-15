/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-danger */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Image from 'next/image'

const JobTemplate = ({ props }) => {
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

  const [isAdmin, setIsAdmin] = useState(false)

  function checkAdmin() {
    return router.pathname === '/admin' ? setIsAdmin(true) : setIsAdmin(false)
  }

  useEffect(() => {
    // Cleans up the text provided by QuillJS wysiwyg
    function styleChildren(children) {
      children.forEach((child) => {
        const el = child

        el.style = ''
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

    checkAdmin()
  }, [])

  function createMarkup(text) {
    return { __html: text }
  }

  return (
    <>
      <div className='container mx-auto'>
        <div className='justify-center md:flex'>
          <div className={`${isAdmin ? 'w-full' : 'md:w-3/4'} md:pr-16`}>
            <h2 data-cy='job-title' className='text-3xl text-blue-900'>
              {jobtitle}
            </h2>

            <div
              data-cy='role-focus-and-position-type'
              className='mb-6 tracking-tight text-blue-600 uppercase text-md'
            >
              {roleFocus}
              <span> • </span>
              {positionType}
            </div>

            <h3
              data-cy='job-description-title'
              className='mb-4 text-2xl text-blue-900'
            >
              Job Description
            </h3>

            <div
              data-cy='job-description'
              id='jobDesc'
              dangerouslySetInnerHTML={createMarkup(jobDescription)}
              className='mb-6 rich-text-content'
            />

            <h4
              data-cy='company-description-title'
              className='mb-4 text-2xl text-blue-900'
            >
              About&nbsp;
              {companyName}
            </h4>

            <div
              data-cy='company-description'
              className='mt-2 text-blue-300 rich-text-content'
              id='companyDesc'
              dangerouslySetInnerHTML={createMarkup(companyDescription)}
            />
          </div>

          {!isAdmin ? (
            <div className='mt-8 text-center md:w-1/4 md:text-left'>
              <div className='p-4 bg-gray-200'>
                {companyLogo ? (
                  <div className='relative flex items-center justify-center w-32 h-32 mb-6 overflow-hidden bg-white rounded-full shadow-md'>
                    <Image
                      data-cy='company-logo'
                      id='companyLogo'
                      height={100}
                      width={100}
                      src={companyLogo}
                      alt={`${companyName} logo`}
                    />
                  </div>
                ) : null}

                <h4
                  data-cy='company-name-sidebar'
                  className='mb-3 text-lg text-blue-900'
                >
                  {companyName}
                </h4>

                <div className='tracking-tight text-blue-900 text-md'>
                  <a
                    data-cy='company-website'
                    className='underline opacity-75 hover:opacity-100'
                    href={companyWebsite}
                  >
                    Visit website
                  </a>
                  <a
                    data-cy='how-to-apply'
                    href={howToApply}
                    className={`hidden text-center md:block btn btn-teal mt-8 w-full
                        ${isPreview ? ' btn-disabled' : ''}`}
                    tabIndex={isPreview ? -1 : 0}
                  >
                    Apply
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* <div className='mt-8'>
          <a
            data-cy='how-to-apply-bottom'
            href={howToApply}
            className={`btn btn-teal w-full md:w-auto ${
              isPreview ? ' btn-disabled' : ''
            }
              `}
            tabIndex={isPreview ? -1 : 0}
          >
            Apply
          </a>
        </div> */}
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
