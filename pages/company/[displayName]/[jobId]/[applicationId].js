import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useJobs } from 'store/jobs_store'
import { useProfileInfo } from 'store/profile_info'
import { db } from 'utils/db'
import nookies from 'nookies'
import { verifyIdToken } from 'utils/db/firebaseAdmin'

import ApplicantCard from 'components/dashboard/CandidateCard'
import BackArrow from 'assets/images/icons/back-arrow'
import ExternalLink from 'assets/images/icons/external-link'

const candidateApplication = ({ session }) => {
  const router = useRouter()
  const applicants = useJobs((s) => s.applicants)
  const setApplicants = useJobs((s) => s.setApplicants)
  const profileInfo = useProfileInfo((s) => s.profileInfo)
  const [candidateInfo, setCandidateInfo] = useState()
  // const [candidateInfo, setCandidateInfo] = useState()

  const { displayName } = router.query
  const { jobId } = router.query
  const { applicationId } = router.query

  // update applicaton to viewed
  useEffect(async () => {
    db.collection('applications').doc(applicationId).update({ viewed: true })
  }, [])

  // grab application doc to get candidate ID
  useEffect(async () => {
    const candidateRef = await db
      .collection('applications')
      .doc(applicationId)
      .get()

    const data = candidateRef.data()
    setCandidateInfo(data)
  }, [])

  // Get all applications for job
  useEffect(async () => {
    const applications = await db
      .collection('applications')
      .where('jobId', '==', jobId)
      .get()

    const applicationsData = applications.docs.map((docSnapshot) => {
      const entry = docSnapshot.data()

      return {
        id: docSnapshot.id,
        candidateId: entry.candidateId,
        favorited: entry.favorited,
        viewed: entry.viewed,
        applicationDate: entry.applicationDate,
      }
    })

    setApplicants(applicationsData)
  }, [])

  if (session) {
    return (
      <section className='container mx-auto mt-12 z-50'>
        <h1 className='sr-only'>
          Viewing {candidateInfo?.candidateProfile?.firstName}{' '}
          {candidateInfo?.candidateProfile?.lastName}&apos;s Application
        </h1>

        <div className='flex flex-col grid-cols-6 gap-10 lg:grid'>
          <div className='col-span-2 lg:mt-32 order-last lg:order-first'>
            <h2 className='text-2xl mb-8 text-teal-700'>Applications</h2>

            <ul>
              {applicants?.map((applicant, index) => (
                <ApplicantCard application={applicant} key={index} />
              ))}

              {!applicants?.length && (
                <li className='opacity-50'>No applications yet!</li>
              )}
            </ul>
          </div>

          <div className='col-span-4 z-30 mt-12 lg:mt-0'>
            <article className='p-6 bg-white rounded-lg shadow-md md:p-8'>
              <Link href={`/company/${displayName}/${jobId}`}>
                <a className='opacity-75 hover:opacity-100 flex items-center'>
                  <BackArrow className='inline-block mr-4' />
                  <span>Go Back</span>
                </a>
              </Link>

              <div className='mt-6 md:grid grid-cols-2 gap-3'>
                {candidateInfo?.candidateProfile?.tech && (
                  <div className='mt-6'>
                    <h3 className='text-xl mb-4'>Tech:</h3>
                    <ul className='list-disc ml-5'>
                      {candidateInfo?.candidateProfile?.tech.map((tech) => (
                        <li className='mb-2'>{tech.techItem}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {candidateInfo?.candidateProfile?.projects && (
                  <div className='mt-6'>
                    <h3 className='text-xl mb-4'>Projects:</h3>
                    <ul className='list-disc ml-5'>
                      {candidateInfo?.candidateProfile?.projects.map(
                        (project) => (
                          <li className='mb-2'>
                            <a
                              className='text-teal-700 underline'
                              href={project.projectItemUrl}
                            >
                              {project.projectItemName}
                              <span>
                                <ExternalLink className='w-5 h-5 inline-block -mt-1 ml-2 opacity-75' />
                              </span>
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className='mt-12'>
                <div className='mb-6'>
                  <p className='font-bold text-lg mb-3'>
                    Describe a difficult problem you solved recently.
                  </p>
                  <p>{candidateInfo?.candidateProfile?.question1}</p>
                </div>

                <div className='mb-6'>
                  <p className='font-bold text-lg mb-3'>
                    What were your first steps when faced with that problem?
                  </p>
                  <p>{candidateInfo?.candidateProfile?.question2}</p>
                </div>

                <div className='mb-6'>
                  <p className='font-bold text-lg mb-3'>
                    How did you overcome that problem?
                  </p>
                  <p>{candidateInfo?.candidateProfile?.question3}</p>
                </div>
              </div>

              <div className='mt-12'>
                <a
                  className='btn btn-teal mr-10'
                  href={`mailto:${candidateInfo?.candidateProfile.email}?subject=Thanks for applying to ${profileInfo?.displayName}! Let's move forward.`}
                >
                  Contact for Interview
                </a>

                <a
                  className='opacity-75 hover:opacity-100'
                  href={`mailto:${candidateInfo?.candidateProfile.email}?subject=Application for ${profileInfo?.displayName}`}
                >
                  Politely Decline
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    )
  }
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)

    return {
      props: {
        session: token.uid,
      },
    }
  } catch (err) {
    context.res.writeHead(302, { location: '/sign-in' })
    context.res.end()
    return { props: [] }
  }
}

export default candidateApplication
