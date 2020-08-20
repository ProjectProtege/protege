import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { db } from '../../firebase/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'

import JobTemplate from '../job/JobTemplate'

const AdminReviewJob = ({ id, receivingEdit }) => {
  const docRef = db.collection('jobs').doc(id)
  let history = useHistory()

  const [job, setJob] = useState()
  const [approval, setApproval] = useState()
  const [status, setStatus] = useState()

  useEffect(() => {
    ;(async function getJob() {
      const docRef = db.collection('jobs').doc(id)

      docRef.get().then(function (res) {
        if (res.exists) {
          setJob(res.data())
          setApproval(res.data().approved)
          setStatus(res.data().status)
        } else {
          return null
        }
      })
    })()
  }, [id])

  function updateApprovalStatus() {
    setApproval(!approval)

    docRef
      .update({
        approved: !approval,
      })
      .then(() => {
        console.log('listing approval', job.approved)
        history.push('/sign-in') /*this is hacky --- make it better */
      })
      .catch((err) => {
        alert('Oops!', err)
      })

    receivingEdit(id)
  }

  function updateJobStatus(e) {
    setStatus(e.target.value)

    docRef
      .update({
        status: e.target.value,
      })
      .then(() => {
        console.log('Status Updated')
      })
      .catch((err) => {
        alert('Oops!', err)
      })

    receivingEdit(id)
  }

  if (!job) return null

  return (
    <div>
      <div className='mb-4 p-3 bg-gray-100 grid grid-cols-3'>
        <div className='flex flex-row items-center'>
          <label className='approval-toggle font-display text-blue-600 text-sm mr-3'>
            <input
              type='checkbox'
              checked={approval}
              onChange={updateApprovalStatus}
            ></input>
            <span className='publish-dot round shadow-inner'></span>
          </label>
        </div>

        <div className='flex flex-row items-center select-wrap'>
          <label className='font-display text-blue-600 text-sm mr-3'>
            Status
          </label>
          <select
            className={`w-full appearance-none pl-4 pr-1 py-1 rounded-full shadow-inner focus:outline-none ${
              status === 'active'
                ? 'text-teal-700'
                : status === 'inactive'
                ? 'text-error opacity-75'
                : 'text-blue-800'
            }`}
            defaultValue={job.status}
            onChange={updateJobStatus}
          >
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
            <option value='filled'>Filled</option>
          </select>
        </div>

        <div className='col-span-1 flex justify-end'>
          <button>
            <FontAwesomeIcon
              icon={faEdit}
              className='text-teal-900 opacity-50 hover:opacity-100 transition ease-in-out duration-150 mr-6'
            />
          </button>
          <button>
            <FontAwesomeIcon
              icon={faTimes}
              className='text-error opacity-50 hover:opacity-100 transition ease-in-out duration-150'
            />
          </button>
        </div>
      </div>

      <JobTemplate props={job} />
    </div>
  )
}

export default AdminReviewJob
