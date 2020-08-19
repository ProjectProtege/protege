import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'

import JobTemplate from '../job/JobTemplate'

const AdminReviewJob = ({ id }) => {
  const [job, setJob] = useState()

  useEffect(() => {
    ;(async function getJob() {
      const docRef = db.collection('jobs').doc(id)

      docRef.get().then(function (res) {
        if (res.exists) {
          setJob(res.data())
        } else {
          return null
        }
      })
    })()
  }, [id])

  if (!job) return null

  return (
    <div>
      <div className='mb-4 p-3 bg-gray-100 grid grid-cols-3'>
        <div className='flex flex-row items-center'>
          <label className='approval-toggle font-display text-blue-600 text-sm mr-3'>
            <input type='checkbox' checked={job.approved}></input>
            <span class='publish-dot round shadow-inner'></span>
          </label>
        </div>

        <div className='flex flex-row items-center select-wrap'>
          <label className='font-display text-blue-600 text-sm mr-3'>
            Status
          </label>
          <select
            className={`w-full appearance-none pl-4 pr-1 py-1 rounded-full shadow-inner focus:outline-none ${
              job.status === 'active'
                ? 'text-teal-700'
                : job.status === 'inactive'
                ? 'text-error opacity-75'
                : 'text-blue-800'
            }`}
          >
            <option value='active' selected>
              Active
            </option>
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
