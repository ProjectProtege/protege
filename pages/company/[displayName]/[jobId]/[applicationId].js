import { useJobs } from 'store/jobs_store'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ApplicantCard from 'components/dashboard/CandidateCard'
import BackArrow from 'assets/images/icons/back-arrow'
import { useEffect } from 'react'
import { db } from 'utils/db'

const candidateApplication = () => {
  const router = useRouter()
  const applicants = useJobs((s) => s.applicants)
  const setApplicants = useJobs((s) => s.setApplicants)
  const activeCandidate = useJobs((s) => s.activeCandidate)
  const setActiveCandidate = useJobs((s) => s.setActiveCandidate)

  const { displayName } = router.query
  const { jobId } = router.query
  const { applicationId } = router.query

  useEffect(async () => {
    db.collection('applications').doc(applicationId).update({ viewed: true })
  }, [])

  useEffect(async () => {
    const candidateInfo = await db
      .collection('candidates')
      .doc(activeCandidate.userUid)
      .get()

    setActiveCandidate(candidateInfo.data())
  }, [])

  // Get applications
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

  return (
    <section className='container mx-auto mt-12 z-50'>
      <h1>hello</h1>

      <div className='grid-cols-6 gap-10 lg:grid'>
        <div className='col-span-2 mt-24'>
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

        <div className='col-span-4 z-30'>
          <article className='p-6 bg-white rounded-lg shadow-md md:p-8'>
            <Link href={`/company/${displayName}/${jobId}`}>
              <a className='opacity-75 hover:opacity-100 flex items-center'>
                <BackArrow className='inline-block mr-4' />
                <span>Go Back</span>
              </a>
            </Link>

            <div className='mt-12'>
              <div className='mb-6'>
                <p className='font-bold text-lg mb-3'>
                  Describe a difficult problem you solved recently.
                </p>
                <p>{activeCandidate?.question1}</p>
              </div>

              <div className='mb-6'>
                <p className='font-bold text-lg mb-3'>
                  What were your first steps when faced with that problem?
                </p>
                <p>{activeCandidate?.question2}</p>
              </div>

              <div className='mb-6'>
                <p className='font-bold text-lg mb-3'>
                  How did you overcome that problem?
                </p>
                <p>{activeCandidate?.question3}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default candidateApplication
