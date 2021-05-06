import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useJobs } from 'store/jobs_store'
import { useEditJob } from 'store/edit-job_store'
import { db } from 'utils/db'

import Trash from 'assets/images/icons/trash'
import Edit from 'assets/images/icons/edit'
import BackArrow from 'assets/images/icons/back-arrow'

const ViewListing = () => {
  const router = useRouter()
  const jobs = useJobs((s) => s.jobs)
  const [job, setJob] = useState()
  const [applicants, setApplicants] = useState()
  const setEditJob = useEditJob((s) => s.setEditJob)

  const { jobId } = router.query
  const { displayName } = router.query

  // Get data about individual job
  useEffect(() => {
    const filteredJob = jobs.filter((item) => {
      return item.id === jobId
    })

    setJob(filteredJob[0])
  }, [jobs])

  // Get applications
  useEffect(async () => {
    const applications = await db
      .collection('applications')
      .where('jobId', '==', jobId)
      .get()

    const applicationsData = applications.docs.map((docSnapshot) => {
      const entry = docSnapshot.data()

      return {
        candidateId: entry.candidateId,
      }
    })

    setApplicants(applicationsData)
  }, [])

  // Formatting react quill content
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
  }, [])

  function createMarkup(text) {
    return { __html: text }
  }

  const deleteJob = async () => {
    try {
      await db.collection('jobs').doc(job.id).delete()
    } catch {
      alert('oops something went wrong')
    }
  }

  // Sets job data to global store and routes to edit page
  // Edit page grabs data from global store for form
  const editJob = () => {
    setEditJob({ job })
    router.push(`/company/${displayName}/${job.id}/edit`)
  }

  return (
    <section className='container mx-auto mt-12 z-50'>
      <h1 className='sr-only'>Viewing job listing for {job?.jobtitle}</h1>

      <div className='grid-cols-6 gap-10 lg:grid'>
        <div className='col-span-4  z-30 p-6 bg-white rounded-lg shadow-md md:p-8'>
          <div className='bg-gray-200 rounded-md mb-8 p-4 flex justify-between items-center'>
            <Link href={`/company/${displayName}/dashboard`}>
              <a className='opacity-75 hover:opacity-100 flex items-center'>
                <BackArrow className='inline-block mr-4' />
                <span>Back to Dashboard</span>
              </a>
            </Link>

            <div className='col-span-2 flex items-center justify-end'>
              <button
                className='opacity-50 hover:opacity-100 mr-6'
                type='button'
                onClick={editJob}
              >
                <Edit />
              </button>
              <button
                className='opacity-50 hover:opacity-100 text-error-full'
                type='button'
                onClick={() => {
                  if (
                    // eslint-disable-next-line no-alert
                    window.confirm(
                      'This is permanant action. Are you sure you want to delete this job?'
                    )
                  )
                    deleteJob()
                }}
              >
                <Trash />
              </button>
            </div>
          </div>

          <h2 data-cy='job-title' className='text-3xl text-blue-900'>
            {job?.jobtitle}
          </h2>

          <div
            data-cy='role-focus-and-position-type'
            className='mb-6 tracking-tight text-blue-600 uppercase text-md'
          >
            {job?.roleFocus}
            <span> • </span>
            {job?.positionType}
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
            dangerouslySetInnerHTML={createMarkup(job?.jobDescription)}
            className='mb-6 rich-text-content'
          />

          <h4
            data-cy='company-description-title'
            className='mb-4 text-2xl text-blue-900'
          >
            About&nbsp;
            {job?.companyName}
          </h4>

          <div
            data-cy='company-description'
            className='mt-2 text-blue-300 rich-text-content'
            id='companyDesc'
            dangerouslySetInnerHTML={createMarkup(job?.companyDescription)}
          />
        </div>
        <div className='col-span-2 mt-32'>
          <h2 className='text-2xl mb-8'>Applications</h2>

          <ul>
            {applicants.map((applicant) => (
              <li className='mb-4 p-4 bg-white shadow'>
                {applicant.candidateId}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ViewListing
