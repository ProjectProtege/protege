/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-danger */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { db } from 'utils/db'
import firebase from 'firebase/app'
import toast from 'react-hot-toast'
import { useAuth } from 'store/AuthContext'

import { v4 as uuidv4 } from 'uuid'
import { useProfileInfo } from 'store/profile_info'
import ExternalLink from 'assets/images/icons/external-link'

const JobTemplate = ({ props }) => {
  const { currentUser } = useAuth()
  const router = useRouter()
  const profileInfo = useProfileInfo((s) => s.profileInfo)
  const [applications, setApplications] = useState([])
  const [hasApplied, setHasApplied] = useState(false)

  const isPreview = router.pathname.indexOf('/job-board/') !== 0

  const jobId = router.query.uid

  const {
    jobDescription,
    companyDescription,
    companyName,
    companyWebsite,
    roleFocus,
    jobtitle,
    positionType,
    avatar,
    howToApply,
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

  // grab all applications for job
  useEffect(async () => {
    if (!isPreview) {
      const appRef = await db
        .collection('applications')
        .where('jobId', '==', jobId)
        .get()

      const appRefData = appRef.docs.map((docSnapshot) => {
        const entry = docSnapshot.data()

        return {
          ...entry,
        }
      })
      setApplications(appRefData)
    }
  }, [])

  // check if user has already applied for job
  useEffect(() => {
    if (currentUser) {
      const checkForApplication = applications.map((application) => {
        return profileInfo.userUid === application.candidateId
      })

      setHasApplied(...checkForApplication)
    }
  }, [])

  function createMarkup(text) {
    return { __html: text }
  }

  const createApplication = async () => {
    const currentDate = firebase.firestore.Timestamp.fromDate(new Date())

    const uid = uuidv4()

    await db
      .collection('applications')
      .doc(uid)
      .set({
        candidateId: profileInfo.userUid,
        jobId,
        applicationDate: currentDate,
        viewed: false,
        favorited: false,
        candidateProfile: { ...profileInfo },
      })

    toast.success('Application submitted!')
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
                {avatar ? (
                  <div className='relative flex items-center justify-center w-32 h-32 mx-auto mb-6 overflow-hidden bg-white rounded-full shadow-md md:mx-0'>
                    <Image
                      data-cy='company-logo'
                      id='avatar'
                      layout='fill'
                      objectFit='contain'
                      src={avatar}
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
                  <div className='mt-4'>
                    {howToApply ? (
                      <a
                        data-cy='how-to-apply-bottom'
                        href={howToApply}
                        className={`btn btn-teal w-full block text-center ${
                          isPreview ? ' btn-disabled' : ''
                        } ${
                          profileInfo?.accountType === 'company'
                            ? 'btn-disabled'
                            : ''
                        }`}
                        tabIndex={isPreview ? -1 : 0}
                      >
                        <span>Apply</span>
                        <ExternalLink className='inline-block w-5 h-5 ml-2 -mt-1 opacity-75' />
                      </a>
                    ) : (
                      <div className='text-center'>
                        <button
                          data-cy='how-to-apply'
                          type='button'
                          onClick={createApplication}
                          className={`text-center btn btn-teal mt-8 mb-3 w-full
  ${isPreview ? ' btn-disabled' : ''} ${
                            profileInfo?.accountType === 'company'
                              ? 'btn-disabled'
                              : ''
                          } ${hasApplied ? 'btn-disabled' : ''} ${
                            !currentUser ? 'btn-disabled' : ''
                          }`}
                          tabIndex={isPreview ? -1 : 0}
                        >
                          Apply
                        </button>
                        <span className='text-sm tracking-wide'>
                          <Link href='/sign-in'>
                            <a className='text-teal-800 underline'>Sign in</a>
                          </Link>{' '}
                          to apply
                        </span>
                      </div>
                    )}
                    {hasApplied && (
                      <span className='text-xs tracking-wide'>
                        You&apos;ve already applied for this job
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

JobTemplate.propTypes = {
  logo: PropTypes.shape({}),
  props: PropTypes.shape({}).isRequired,
  companyName: PropTypes.string,
  companyWebsite: PropTypes.string,
  roleFocus: PropTypes.string,
  jobtitle: PropTypes.string,
  positionType: PropTypes.string,
  jobDescription: PropTypes.string,
  companyDescription: PropTypes.string,
  avatar: PropTypes.string,
  howToApply: PropTypes.string,
}

JobTemplate.defaultProps = {
  avatar: '',
  logo: {},
  companyName: '',
  companyWebsite: '',
  roleFocus: '',
  jobtitle: '',
  positionType: '',
  jobDescription: '',
  companyDescription: '',
  howToApply: '',
}

export default JobTemplate
