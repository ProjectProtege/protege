import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'

import JobTemplate from '../job/JobTemplate'

const AdminReviewJob = ({ id }) => {
  const [job, setJob] = useState()

  useEffect(() => {
    ;(async function getJob() {
      const docRef = db.collection('jobs').doc(id)

      docRef.get().then(function (res) {
        console.log(res)

        if (res.exists) {
          setJob(res.data())
          console.log(id, 'job id')
          console.log(res.data())
        } else {
          return null
        }
      })
    })()
  }, [id])

  if (!job) return null

  return (
    <div>
      <JobTemplate props={job} />
    </div>
  )
}

export default AdminReviewJob
