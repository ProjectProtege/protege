import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'

import JobTemplate from '../job/JobTemplate'

const AdminReviewJob = ({
  id,
  receivingEdit,
  receivingNotification,
  deleteJobForever,
}) => {
  const docRef = db.collection('jobs').doc(id)
  const timeStamp = new Date()
  const uuid = `${id}-${timeStamp.getUTCMilliseconds()}`

  const [job, setJob] = useState()
  const [approval, setApproval] = useState()
  const [status, setStatus] = useState()
  const [updating, setUpdating] = useState(false)

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

  async function updateApprovalStatus() {
    setApproval(!approval)

    await docRef
      .update({
        approved: !approval,
      })
      .then(() => {
        receivingEdit(uuid)
        receivingNotification(uuid, true)
      })
      .catch((err) => {
        receivingNotification(err, false)
      })
  }

  async function updateJobStatus(e) {
    setUpdating(true)
    setStatus(e.target.value)

    await docRef
      .update({
        status: e.target.value,
      })
      .then(() => {
        receivingEdit(uuid, true)
        receivingNotification(uuid, true)
        setUpdating(false)
      })
      .catch((err) => {
        receivingNotification(err, false)
      })
  }

  if (!job) return null

  return (
    <div>
      <div className='mb-4 p-3 bg-gray-100 grid grid-cols-3'>
        <div className='flex flex-row items-center'>
          <label className='approval-toggle font-display text-blue-600 text-sm mr-3 flex'>
            <input
              type='checkbox'
              checked={approval}
              onChange={updateApprovalStatus}
            ></input>
            <span className='publish-dot round shadow-inner'></span>
          </label>
        </div>

        <div className={`flex flex-row items-center select-wrap `}>
          <label className='font-display text-blue-600 text-sm mr-3'>
            Status
          </label>
          <select
            className={`w-full appearance-none pl-4 pr-1 py-1 rounded-full shadow-inner focus:outline-none ${
              updating ? 'opacity-50 pointer-events-none' : ''
            } ${
              status === 'active'
                ? 'text-teal-700'
                : status === 'inactive'
                ? 'text-error-full'
                : 'text-blue-800'
            }
            `}
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
          <button
            onClick={(e) => {
              if (
                window.confirm(
                  'This is a permanent and destructive action. Are you sure?'
                )
              )
                deleteJobForever(id)
            }}
          >
            <FontAwesomeIcon
              icon={faTimes}
              className='text-error-full opacity-50 hover:opacity-100 transition ease-in-out duration-150'
            />
          </button>
        </div>
      </div>

      <JobTemplate props={job} />
    </div>
  )
}

export default AdminReviewJob